import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DetalleVenta } from 'src/modelo/DetalleVenta';
import { MatTable, MatDialog, MatSnackBar } from '@angular/material';
import { Observable, Subscription, of, BehaviorSubject } from 'rxjs';
import { CompraService } from 'src/services/compra.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { ClientesHttpService } from 'src/http-services/clientes.service';
import { CompraDatosClienteDialogComponent } from '../dialogos/datos-cliente/datos-cliente.component';
import { Cliente } from 'src/modelo/Cliente';
import { Venta } from 'src/modelo/Venta';
import { VentasHttpService } from 'src/http-services/ventas.service';

@Component({
  selector: 'app-compra-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class CompraResumenComponent implements OnInit, OnDestroy {
  
  protected _detallesSub: Subscription;
  protected _detallesVenta$: BehaviorSubject<DetalleVenta[]>;
  protected _cantidadItems$: BehaviorSubject<number>;
  protected _subtotalVenta$: BehaviorSubject<number>;
  protected _totalVenta$: BehaviorSubject<number>;

  @ViewChild("tabla") public tabla: MatTable<DetalleVenta>;
  public columnasTabla: string[];

  public fechaVenta: string;
  public detallesVenta$: Observable<DetalleVenta[]>;
  public subtotalVenta$: Observable<number>;
  public totalVenta$: Observable<number>;
  public cantidadItems$: Observable<number>;

  constructor(
    protected router: Router,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar,
    protected authSvc: AuthService,
    protected compraSvc: CompraService,
    protected vtaHttpSvc: VentasHttpService,
    protected cliHttpSvc: ClientesHttpService
  ) { 
    this._detallesVenta$ = new BehaviorSubject<DetalleVenta[]>([]);
    this._cantidadItems$ = new BehaviorSubject<number>(0);
    this._subtotalVenta$ = new BehaviorSubject<number>(0);
    this._totalVenta$ = new BehaviorSubject<number>(0);
    this.detallesVenta$ = this._detallesVenta$.asObservable();
    this.cantidadItems$ = this._cantidadItems$.asObservable();
    this.subtotalVenta$ = this._subtotalVenta$.asObservable();
    this.totalVenta$ = this._totalVenta$.asObservable();
    this.columnasTabla = [ "producto", "precio", "cantidad", "total", "acciones" ];
  }

  ngOnInit() {
    this._detallesSub = this.compraSvc.detalles$.subscribe(d => { this.generarResumen(d); });
  }

  ngOnDestroy() {
    if (this._detallesSub) {
      this._detallesSub.unsubscribe();
    }
  }
  
  private generarResumen(detalles: DetalleVenta[]): void {

    if (detalles.length === 0) {
      this.router.navigateByUrl("/compra");
    }

    let cantidadAux: number = 0;
    let subtotalAux: number = 0;
    for (const item of detalles) {
      if (item.precioProducto && item.unidadesProducto) {
        const unidades = item.unidadesProducto;
        cantidadAux += unidades;

        const detalleValor = item.precioProducto * unidades;
        subtotalAux += detalleValor;
      }
    }

    const totalAux = Math.trunc(subtotalAux * 1.19);
    
    this._detallesVenta$.next(detalles);
    this._cantidadItems$.next(cantidadAux);
    this._subtotalVenta$.next(subtotalAux);
    this._totalVenta$.next(totalAux);
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
          this.snackBar.open("¡Gracias por su compra! Esta transacción es la N° "+idVenta+".", "OK", {duration: undefined, panelClass: "super-overlay"});
          this.compraSvc.reset();
          setTimeout(()=>{ this.router.navigateByUrl("/compra");},5000);
        } else {
          this.snackBar.open("Hubo un error al ingresar su compra. Por favor, inténtelo nuevamente.");
        }
      },
      err => {
        console.log(err);
        this.snackBar.open("Hubo un error al ingresar su compra. Por favor, inténtelo nuevamente.");
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
      let vta: Venta = this.compraSvc.crearVenta(idCliente);
      this.ingresarVenta(vta);
    } else {
      let cliDialog = this.dialog.open(CompraDatosClienteDialogComponent, {
        width: "40rem",
        height: "28rem"
      });

      this.snackBar.open("Estimado cliente, no ha ingresado sesión.\nPor favor, ingrese sus datos personales para hacer efectiva la transacción.", "OK", {duration: undefined, panelClass: "super-overlay"});
      
      cliDialog.afterClosed().subscribe(
        (cli: Cliente) => {
          if (cli && cli.idCliente > 1) {
            let vta: Venta = this.compraSvc.crearVenta(cli.idCliente);
            this.ingresarVenta(vta);
          }
        }
      );
    }

  }
}
