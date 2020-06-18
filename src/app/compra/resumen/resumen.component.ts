import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, Subject } from 'rxjs';
import { MSJ_ERROR_COMM_SRV } from 'src/app/shared/constantes';
import { PerfilUsuarioFormDialogComponent } from 'src/app/shared/perfil-usuario-form-dialog/perfil-usuario-form-dialog.component';
import { EntityDataService } from 'src/data/entity.data.iservice';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';
import { Cliente } from 'src/models/entities/Cliente';
import { DetalleVenta } from 'src/models/entities/DetalleVenta';
import { Venta } from 'src/models/entities/Venta';
import { AuthService } from 'src/app/auth.service';
import { CompraService } from 'src/app/compra/compra.service';

@Component({
  selector: 'app-compra-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class CompraResumenComponent
  implements OnInit, OnDestroy {

  protected detallesVentaSource: Subject<DetalleVenta[]> = new BehaviorSubject([]);
  protected cantidadItemsSource: Subject<number> = new BehaviorSubject(0);
  protected subtotalVentaSource: Subject<number> = new BehaviorSubject(0);
  protected totalVentaSource: Subject<number> = new BehaviorSubject(0);

  public columnasTabla: string[] = [ 'producto', 'precio', 'cantidad', 'total', 'acciones' ];

  public fechaVenta: string;
  public detallesVenta$: Observable<DetalleVenta[]> = this.detallesVentaSource.asObservable();
  public cantidadItems$: Observable<number> = this.cantidadItemsSource.asObservable();
  public subtotalVenta$: Observable<number> = this.subtotalVentaSource.asObservable();
  public totalVenta$: Observable<number> = this.totalVentaSource.asObservable();

  protected detallesSub: Subscription;

  constructor(
    @Inject(DATA_SERVICE_ALIASES.sales) protected saleDataService: EntityDataService<Venta>,
    @Inject(DATA_SERVICE_ALIASES.clients) protected clientDataService: EntityDataService<Cliente>,
    protected router: Router,
    protected dialogService: MatDialog,
    protected snackBarService: MatSnackBar,
    protected authService: AuthService,
    protected compraService: CompraService,
  ) {
  }

  ngOnInit() {
    this.detallesSub = this.compraService.detalles$.subscribe(d => { this.generarResumen(d); });
  }

  ngOnDestroy() {
    if (this.detallesSub) {
      this.detallesSub.unsubscribe();
    }
  }

  private generarResumen(detalles: DetalleVenta[]): void {

    if (detalles.length === 0) {
      this.router.navigateByUrl('/compra');
    }

    let cantidadAux = 0;
    let subtotalAux = 0;
    for (const item of detalles) {
      if (item.precioProducto && item.unidadesProducto) {
        const unidades = item.unidadesProducto;
        cantidadAux += unidades;

        const detalleValor = item.precioProducto * unidades;
        subtotalAux += detalleValor;
      }
    }

    const totalAux = Math.trunc(subtotalAux * 1.19);

    this.detallesVentaSource.next(detalles);
    this.cantidadItemsSource.next(cantidadAux);
    this.subtotalVentaSource.next(subtotalAux);
    this.totalVentaSource.next(totalAux);
  }

  public onClickIncrementarCantidadProducto(index: number): void {
    this.compraService.incrementarUnidadesProducto(index);
  }

  public onClickReducirCantidadProducto(index: number): void {
    this.compraService.reducirUnidadesProducto(index);
  }

  public onClickQuitarProducto(index: number): void {
    this.compraService.quitarProducto(index);
  }

  protected ingresarVenta(vt: Venta): void {
    this.saleDataService.create(vt).subscribe(
      (vt2: Venta) => {
        // TODO: make sure vt2 is not actually vt
        if (vt2) {
          this.snackBarService.open(
            '¡Gracias por su compra! Esta transacción es la N° ' + vt2 + '.',
            'OK',
            {duration: undefined, panelClass: 'super-overlay'}
          );
          this.compraService.reset();
          setTimeout(() => { this.router.navigateByUrl('/compra'); }, 5000);
        } else {
          this.snackBarService.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
        }
      },
      () => {
        this.snackBarService.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
      }
    );
  }

  public onClickAceptar(): void {
    let idCliente: number;

    if (this.authService.sesion) {
      const idSesionCliente = this.authService.sesion.idCliente;
      if (idSesionCliente) {
        idCliente = idSesionCliente;
      }
    }

    if (idCliente) {
      const nueva: Venta = this.compraService.generarVentaConCliente(idCliente);
      this.ingresarVenta(nueva);
    } else {
      const cliDialog = this.dialogService.open(
        PerfilUsuarioFormDialogComponent,
        { width: '40rem' }
      );

      this.snackBarService.open(
        'Estimado cliente, no ha ingresado sesión.\n'
      + 'Por favor, ingrese sus datos personales para hacer efectiva la transacción.',
        'OK',
        { duration: -1, panelClass: 'super-overlay' }
      );

      cliDialog.afterClosed().subscribe(
        (cli: Cliente) => {
          if (cli && cli.id > 1) {
            const vta: Venta = this.compraService.generarVentaConCliente(cli.id);
            this.ingresarVenta(vta);
          }
        }
      );
    }

  }
}
