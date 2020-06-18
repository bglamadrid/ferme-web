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
    @Inject(DATA_SERVICE_ALIASES.auth) protected authDataService: AuthDataService,
    protected dialog: MatDialogRef<CompraLoginDialogComponent>,
    protected formBuilder: FormBuilder,
    protected router: Router,
    protected snackBarService: MatSnackBar,
    protected authService: AuthService
  ) {
    super(authDataService, formBuilder, router, snackBarService, authService);
  }

  public onClickAceptar(): void {
    this.cargando = true;

    const usr: Login = {
      usuario: this.usuario.value,
      clave: this.clave.value
    };

    this.authDataService.abrirSesion(usr).pipe(
      finalize(() => { this.cargando = false; })
    ).subscribe(
      (ssn: Sesion) => {
        if (!ssn || !ssn.hashSesion) {
          this.snackBarService.open('Credenciales invalidas.', 'OK', { duration: -1 });
        } else {
          this.authService.sesion = ssn;
          this.dialog.close();
          this.snackBarService.open('Ha iniciado sesion correctamente.');
        }
      },
      err => {
        console.log(err);
        this.snackBarService.open('Hubo un problema al autenticar.', 'OK', { duration: -1 });
      }
    );
  }

  public onClickCancelar(): void {
    this.dialog.close();
  }

}
