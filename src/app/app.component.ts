import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Sesion } from 'src/models/Sesion';
import { AuthService } from 'src/services/auth.service';
import { Usuario } from 'src/models/Usuario';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  protected _usuario: Usuario;
  protected _changeSesionSub: Subscription;
  protected _routerParamsSub: Subscription;

  constructor(
    protected authSvc: AuthService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {

    // this._routerParamsSub = this.route.params.subscribe((params) => {
    //   alert("aaa");
    //   this.rutinaAutorizacion();
    // });

    // this._changeSesionSub = this.authSvc.sesionCambia.subscribe(
    //   (ssn: Sesion) => {
    //     const modulo = this.route.snapshot.url[0].toString();

    //     if (modulo !== "login") {
    //       if (ssn) {
    //         this._usuario = new Usuario();
    //         this._usuario.idUsuario = ssn.idUsuario;
    //         this._usuario.nombreUsuario = ssn.nombreUsuario;
    //       } else {
    //         this._usuario = null;
    //         this.snackBar.open("Usuario inválido; redirigiendo a login.");
    //         this.router.navigate(["login"]);
    //       }
    //     }
    //   }
    // );
  }

  ngOnDestroy() {
    if (this._routerParamsSub) { this._routerParamsSub.unsubscribe(); }
    if (this._changeSesionSub) { this._changeSesionSub.unsubscribe(); }
  }
}
