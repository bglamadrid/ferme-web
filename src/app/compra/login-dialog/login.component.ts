import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from 'src/app/auth.service';
import { AuthHttpDataService } from 'src/data/http/auth.http-data.service';

import { LoginComponent, Login } from 'src/app/login/login.component';
import { Sesion } from 'src/models/entities/Sesion';
import { finalize } from 'rxjs/operators';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';

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
    @Inject(DATA_SERVICE_ALIASES.auth) protected authHttpSvc: AuthHttpDataService,
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
