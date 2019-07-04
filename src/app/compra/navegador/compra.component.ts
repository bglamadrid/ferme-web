import { Component, OnInit, OnDestroy } from '@angular/core';
import { FERME_GESTION_ROUTES, FERME_AUTHORIZED_CARGOS } from '../../../routing/gestion.routes';
import { AuthService } from 'src/services/auth.service';
import { Router, ActivatedRoute, Event } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AuthHttpService } from 'src/http-services/auth.service';
import { Sesion } from 'src/modelo/Sesion';
import { Subscription } from 'rxjs';
import { DetalleVenta } from 'src/modelo/DetalleVenta';
import { CompraLoginDialogComponent } from '../dialogos/login/login.component';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraNavegadorComponent implements OnInit {

  protected _autenticado: boolean;
  public detallesVenta: DetalleVenta[];

  constructor(
    protected authSvc: AuthService,
    protected auttHttpSvc: AuthHttpService,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected dialog: MatDialog
  ) { 
    this._autenticado = false;
  }

  public get estaAutenticado(): boolean { return !!this.authSvc.sesion; }
  public get usuarioNombre(): string { return this.authSvc.sesion? this.authSvc.sesion.nombreUsuario : "No identificado"; }

  ngOnInit() {5
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
        this.snackBar.open("Hubo un error de comunicación con el servidor.");
      }
    );
  }

  public onClickSalir(): void {

    if (this.estaAutenticado) {
      this.auttHttpSvc.cerrarSesion(this.authSvc.sesion).subscribe(
        () => {
          this.snackBar.open("Su sesión ha sido cerrada por seguridad.");
        },
        err => {
          this.snackBar.open("Su sesión no pudo ser cerrada. Hubo un error de comunicación con el servidor.");
        },
        () => { this.authSvc.sesion = null; }
      );
    }

    this.router.navigateByUrl("/login");
  }

}
