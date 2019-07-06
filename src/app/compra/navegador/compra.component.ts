import { Component, OnInit, OnDestroy } from '@angular/core';
import { FERME_GESTION_ROUTES, FERME_AUTHORIZED_CARGOS } from '../../../routing/gestion.routes';
import { AuthService } from 'src/services/auth.service';
import { Router, ActivatedRoute, Event } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AuthHttpService } from 'src/http-services/auth.service';
import { Sesion } from 'src/modelo/Sesion';
import { Subscription, Subject } from 'rxjs';
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

  public detallesVenta: DetalleVenta[];

  constructor(
    protected authSvc: AuthService,
    protected auttHttpSvc: AuthHttpService,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected dialog: MatDialog,
    protected compraSvc: CompraService
  ) { 
    this.detallesVenta = [];
  }

  public get estaAutenticado(): boolean { return !!this.authSvc.sesion; }
  public get usuarioNombre(): string { return this.authSvc.sesion? this.authSvc.sesion.nombreUsuario : "No identificado"; }

  ngOnInit() {
    //this._sesionCambiaSub = this.authSvc.sesionCambiada.subscribe(() => { this.alCambiarSesion(); });
    this._detallesSub = this.compraSvc.detalles$.subscribe(d => { this.detallesVenta = d; });
    
  }

  ngOnDestroy() {
    if (this._sesionCambiaSub) {
      this._sesionCambiaSub.unsubscribe();
    }

    if (this.estaAutenticado) {
      this.auttHttpSvc.cerrarSesion(this.authSvc.sesion).subscribe(
        () => { },
        err => { console.log(err); },
        () => { 
          this.snackBar.open("Su sesión ha sido cerrada por seguridad.");
          this.authSvc.sesion = null; 
        }
      );
    }
  }
/*
  protected alCambiarSesion(): void {
    if (!this.authSvc.sesion) {
      this.router.navigateByUrl("/login");
    }
  }
*/
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
