import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatTable } from '@angular/material';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MSJ_ERROR_COMM_SRV } from 'src/app/compartido/constantes';
import { DatosUsuarioDialogComponent } from 'src/app/dialogos/datos-usuario/datos-usuario.component';
import { ClientesHttpService } from 'src/http-services/clientes-http.service';
import { VentasHttpService } from 'src/http-services/ventas-http.service';
import { Cliente } from 'src/modelo/Cliente';
import { DetalleVenta } from 'src/modelo/DetalleVenta';
import { Venta } from 'src/modelo/Venta';
import { AuthService } from 'src/services/auth.service';
import { CompraService } from 'src/services/compra.service';

@Component({
  selector: 'app-compra-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class CompraResumenComponent implements OnInit, OnDestroy {

  protected detallesVentaSource: BehaviorSubject<DetalleVenta[]>;
  protected cantidadItemsSource: BehaviorSubject<number>;
  protected subtotalVentaSource: BehaviorSubject<number>;
  protected totalVentaSource: BehaviorSubject<number>;

  @ViewChild('tabla', { static: true }) public tabla: MatTable<DetalleVenta>;
  public columnasTabla: string[];

  public fechaVenta: string;
  public detallesVenta$: Observable<DetalleVenta[]>;
  public subtotalVenta$: Observable<number>;
  public totalVenta$: Observable<number>;
  public cantidadItems$: Observable<number>;

  protected detallesSub: Subscription;

  constructor(
    protected router: Router,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar,
    protected authSvc: AuthService,
    protected compraSvc: CompraService,
    protected vtaHttpSvc: VentasHttpService,
    protected cliHttpSvc: ClientesHttpService
  ) {
    this.detallesVentaSource = new BehaviorSubject([]);
    this.cantidadItemsSource = new BehaviorSubject(0);
    this.subtotalVentaSource = new BehaviorSubject(0);
    this.totalVentaSource = new BehaviorSubject(0);
    this.detallesVenta$ = this.detallesVentaSource.asObservable();
    this.cantidadItems$ = this.cantidadItemsSource.asObservable();
    this.subtotalVenta$ = this.subtotalVentaSource.asObservable();
    this.totalVenta$ = this.totalVentaSource.asObservable();
    this.columnasTabla = [ 'producto', 'precio', 'cantidad', 'total', 'acciones' ];
  }

  ngOnInit() {
    this.detallesSub = this.compraSvc.detalles$.subscribe(d => { this.generarResumen(d); });
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
    this.compraSvc.incrementarUnidadesProducto(index);
  }

  public onClickReducirCantidadProducto(index: number): void {
    this.compraSvc.reducirUnidadesProducto(index);
  }

  public onClickQuitarProducto(index: number): void {
    this.compraSvc.quitarProducto(index);
  }

  protected ingresarVenta(vta: Venta): void {
    this.vtaHttpSvc.guardarVenta(vta).subscribe(
      (idVenta: number) => {
        if (idVenta) {
          this.snackBar.open(
            '¡Gracias por su compra! Esta transacción es la N° ' + idVenta + '.',
            'OK',
            {duration: undefined, panelClass: 'super-overlay'}
          );
          this.compraSvc.reset();
          setTimeout(() => { this.router.navigateByUrl('/compra'); }, 5000);
        } else {
          this.snackBar.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
        }
      },
      () => {
        this.snackBar.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
      }
    );
  }

  public onClickAceptar(): void {
    let idCliente: number;

    if (this.authSvc.sesion) {
      const idSesionCliente = this.authSvc.sesion.idCliente;
      if (idSesionCliente) {
        idCliente = idSesionCliente;
      }
    }

    if (idCliente) {
      const nueva: Venta = this.compraSvc.generarVentaConCliente(idCliente);
      this.ingresarVenta(nueva);
    } else {
      const cliDialog = this.dialog.open(
        DatosUsuarioDialogComponent,
        { width: '40rem' }
      );

      this.snackBar.open(
        'Estimado cliente, no ha ingresado sesión.\n'
      + 'Por favor, ingrese sus datos personales para hacer efectiva la transacción.',
        'OK',
        { duration: -1, panelClass: 'super-overlay' }
      );

      cliDialog.afterClosed().subscribe(
        (cli: Cliente) => {
          if (cli && cli.idCliente > 1) {
            const vta: Venta = this.compraSvc.generarVentaConCliente(cli.idCliente);
            this.ingresarVenta(vta);
          }
        }
      );
    }

  }
}
