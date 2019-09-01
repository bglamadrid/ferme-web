import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef } from '@angular/material';

import { AuthService } from 'src/services/auth.service';
import { AuthHttpService } from 'src/http-services/auth-http.service';

import { LoginComponent, Login } from 'src/app/login/login.component';
import { Sesion } from 'src/modelo/Sesion';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-compra-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class CompraLoginDialogComponent extends LoginComponent {

  constructor(
    protected fb: FormBuilder,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected authSvc: AuthService,
    protected authHttpSvc: AuthHttpService,
    protected dialogRef: MatDialogRef<CompraLoginDialogComponent>
  ) {
    super(fb, router, snackBar, authSvc, authHttpSvc);
  }

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
        } else {
          this.authSvc.Sesion = ssn;
          this.dialogRef.close();
          this.snackBar.open('Ha iniciado sesion correctamente.');
        }
      },
      err => {
        console.log(err);
        this.snackBar.open('Hubo un problema al autenticar.', 'OK', { duration: -1 });
      }
    );
  }

  public onClickCancelar(): void {
    this.dialogRef.close();
  }

}
