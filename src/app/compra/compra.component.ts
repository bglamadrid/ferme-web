import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MSJ_ERROR_COMM_SRV } from 'src/app/shared/constantes';
import { ConfirmacionDialogComponent, ConfirmationDialogData } from 'src/app/shared/confirmation-dialog/confirmacion.component';
import { PerfilUsuarioFormDialogComponent, PerfilUsuarioFormDialogData } from 'src/app/shared/perfil-usuario-form-dialog/perfil-usuario-form-dialog.component';
import { AuthHttpService } from 'src/http-services/auth-http.service';
import { DetalleVenta } from 'src/models/DetalleVenta';
import { AuthService } from 'src/services/auth.service';
import { CompraService } from 'src/services/compra.service';
import { CompraLoginDialogComponent } from './login-dialog/login.component';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: [
    '../../assets/styles/navegadores.css',
    './compra.component.css'
]
})
export class CompraNavegadorComponent implements OnInit, OnDestroy {

  protected detallesSub: Subscription;
  protected sesionCambiaSub: Subscription;

  public subtotalVentaActual: number;
  public cantidadItems: number;

  public mostrarResumen: boolean;

  constructor(
    protected authSvc: AuthService,
    protected auttHttpSvc: AuthHttpService,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected dialog: MatDialog,
    protected compraSvc: CompraService
  ) {
    this.subtotalVentaActual = 0;
    this.mostrarResumen = false;
  }

  public get estaAutenticado(): boolean { return !!this.authSvc.sesion; }
  public get usuarioNombre(): string { return this.authSvc.sesion ? this.authSvc.sesion.nombreUsuario : ''; }

  ngOnInit() {
    this.detallesSub = this.compraSvc.detalles$.subscribe(d => { this.generarResumenCarritoEnCabecera(d); });
  }

  ngOnDestroy() {
    if (this.sesionCambiaSub) {
      this.sesionCambiaSub.unsubscribe();
    }

    if (this.estaAutenticado) {
      this.auttHttpSvc.cerrarSesion(this.authSvc.sesion).pipe(
        finalize(() => { this.authSvc.Sesion = null; })
      ).subscribe(
        () => {
          this.snackBar.open('Su sesión ha sido cerrada por seguridad.');
        }
      );
    }
  }


  private generarResumenCarritoEnCabecera(detalles: DetalleVenta[]): void {
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

    this.cantidadItems = cantidadAux;
    this.subtotalVentaActual = subtotalAux;

    const mostrar = (subtotalAux > 0);
    this.mostrarResumen = mostrar;
  }

  protected solicitarConfirmacionCerrarSesion(): Observable<boolean> {
    const dialogData: ConfirmationDialogData = {
      titulo: '¿Cerrar sesion?',
      mensaje: 'Si esta realizando una transaccion, perdera la informacion que haya guardado.'
    };

    return this.dialog.open(
      ConfirmacionDialogComponent,
      {
        width: '24rem',
        data: dialogData
      }
    ).afterClosed();
  }

  public onClickAbrirSesion(): void {
    const dConf = {
      width: '24rem',
      height: '24rem'
    };
    this.dialog.open(CompraLoginDialogComponent, dConf);
  }

  public onClickEditarUsuario(): void {
    const sesion = this.authSvc.sesion;
    this.auttHttpSvc.obtenerDatosPersonaSesion(sesion).subscribe(
      perfil => {
        const dialogData: PerfilUsuarioFormDialogData = { persona: perfil };
        const dConf = {
          width: '60rem',
          data: dialogData
        };
        this.dialog.open(PerfilUsuarioFormDialogComponent, dConf);
      },
      () => {
        this.snackBar.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
      }
    );
  }

  public onClickCerrarSesion(): void {
    this.solicitarConfirmacionCerrarSesion().subscribe(
      confirmado => {
        if (confirmado) {
          this.auttHttpSvc.cerrarSesion(this.authSvc.sesion).pipe(
            finalize(() => { this.authSvc.Sesion = null; })
          ).subscribe(
            () => {
              this.snackBar.open('Su sesión ha sido cerrada.');
            },
            err => {
              console.log(err);
              this.snackBar.open('Hubo un error de comunicación con el servidor.');
            }
          );
        }
      }
    );
  }
}
