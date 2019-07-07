import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router, ActivatedRoute, Event } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AuthHttpService } from 'src/http-services/auth.service';
import { Subscription, Subject, BehaviorSubject, Observable } from 'rxjs';
import { DetalleVenta } from 'src/modelo/DetalleVenta';
import { CompraLoginDialogComponent } from '../dialogos/login/login.component';
import { CompraService } from 'src/services/compra.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraNavegadorComponent implements OnInit, OnDestroy {

  protected _detallesSub: Subscription;
  protected _sesionCambiaSub: Subscription;

  protected _mostrarResumen$: BehaviorSubject<boolean>;

  public subtotalVentaActual: number;
  public cantidadItems: number;

  public mostrarResumen$: Observable<boolean>;

  constructor(
    protected authSvc: AuthService,
    protected auttHttpSvc: AuthHttpService,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected dialog: MatDialog,
    protected compraSvc: CompraService
  ) { 
    this.subtotalVentaActual = 0;

    this._mostrarResumen$ = new BehaviorSubject<boolean>(false);
    this.mostrarResumen$ = this._mostrarResumen$.asObservable();
  }

  public get estaAutenticado(): boolean { return !!this.authSvc.sesion; }
  public get usuarioNombre(): string { return this.authSvc.sesion? this.authSvc.sesion.nombreUsuario : "Usuario no identificado"; }

  ngOnInit() {
    this._detallesSub = this.compraSvc.detalles$.subscribe(d => { this.generarResumenEnCabecera(d); });
  }

  ngOnDestroy() {
    if (this._sesionCambiaSub) {
      this._sesionCambiaSub.unsubscribe();
    }

    if (this.estaAutenticado) {
      this.auttHttpSvc.cerrarSesion(this.authSvc.sesion).subscribe(
        () => { 
          this.snackBar.open("Su sesión ha sido cerrada por seguridad.");
        },
        err => { console.log(err); },
        () => { 
          this.authSvc.sesion = null; 
        }
      );
    }
  }


  private generarResumenEnCabecera(detalles: DetalleVenta[]): void {
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
    
    this.cantidadItems = cantidadAux;
    this.subtotalVentaActual = subtotalAux;

    const mostrar = (subtotalAux > 0);
    this._mostrarResumen$.next(mostrar);
    
  }

  public onClickAbrirSesion(): void {
    this.dialog.open(CompraLoginDialogComponent, {
      width: "24rem",
      height: "24rem"
    });
  }

  public onClickCerrarSesion(): void {
    this.auttHttpSvc.cerrarSesion(this.authSvc.sesion).subscribe(
      () => {
        this.authSvc.sesion = null;
        this.snackBar.open("Su sesión ha sido cerrada.");
      },
      err => {
        console.log(err);
        this.snackBar.open("Hubo un error de comunicación con el servidor.");
      }
    );
  }
}
