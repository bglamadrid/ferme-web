import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { Login, LoginComponent } from 'src/app/login/login.component';
import { AuthDataService } from 'src/data/auth.data.iservice';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';
import { Sesion } from 'src/models/entities/Sesion';



@Component({
  selector: 'app-compra-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class CompraLoginDialogComponent
  extends LoginComponent {

  constructor(
    protected fb: FormBuilder,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected authSvc: AuthService,
    @Inject(DATA_SERVICE_ALIASES.auth) protected authHttpSvc: AuthDataService,
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
