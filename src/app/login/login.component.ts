import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from 'src/services/auth.service';
import { AuthHttpService } from 'src/http-services/auth-http.service';
import { Sesion } from 'src/modelo/Sesion';
import { finalize } from 'rxjs/operators';
import { MSJ_ERROR_COMM_SRV } from '../compartido/constantes';

export interface Login {
  usuario: string;
  clave: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../compartido/single-card-page.css',
    './login.component.css'
  ]
})
export class LoginComponent {

  public loginForm: FormGroup;
  public cargando: boolean;
  public esconderClave: boolean;

  constructor(
    protected fb: FormBuilder,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected authSvc: AuthService,
    protected authHttpSvc: AuthHttpService
  ) {
    this.cargando = true;
    this.esconderClave = true;

    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
    });
    this.cargando = false;
  }

  public get usuario() { return this.loginForm.get('usuario'); }
  public get clave() { return this.loginForm.get('clave'); }

  public get iconoBotonMostrarClave(): string { return this.esconderClave ? 'visibility' : 'visibility_off'; }
  public get claveInputType(): string { return this.esconderClave ? 'password' : 'text'; }

  public onClickAceptar(): void {
    this.cargando = true;

    const usr: Login = {
      usuario: this.usuario.value,
      clave: this.clave.value
    };

    this.authHttpSvc.abrirSesion(usr).pipe(
      finalize(() => { this.cargando = false; })
    ).subscribe(
      (ssn: Sesion) => {
        if (!ssn || !ssn.hashSesion) {
          this.snackBar.open('Credenciales invalidas.', 'OK', { duration: -1 });
        } else if (!ssn.idEmpleado) {
          this.snackBar.open('Su cuenta no posee privilegios suficientes para ingresar.', 'OK', { duration: -1 });
        } else {
          this.authSvc.Sesion = ssn;
          this.router.navigateByUrl('/gestion');
        }
      },
      () => {
        this.snackBar.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
      }
    );
  }

}
