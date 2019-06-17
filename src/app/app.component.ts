import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Sesion } from 'src/models/Sesion';
import { AuthService } from 'src/services/auth.service';
import { Usuario } from 'src/models/Usuario';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy { 

  private _usuario: Usuario;
  private _changeSesionSub: Subscription;
  private _routerParamsSub: Subscription;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
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

  private rutinaAutorizacion(): void {
    const modulo = this.route.snapshot.url[0].toString();
    if (modulo !== "login") {
      this.authSvc.validarSesion();
      if (!this.authSvc.sesion) {
        this.router.navigate(["login"]);
      }
    }
  }
}
