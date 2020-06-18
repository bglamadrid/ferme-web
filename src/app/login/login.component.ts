import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { AuthDataService } from 'src/data/auth.data.iservice';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';
import { Sesion } from 'src/models/entities/Sesion';
import { MSJ_ERROR_COMM_SRV } from '../shared/constantes';


export interface Login {
  usuario: string;
  clave: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../../assets/styles/single-card-page.css',
    './login.component.css'
  ]
})
export class LoginComponent {

  public loginForm: FormGroup;
  public cargando: boolean;
  public esconderClave: boolean;

  constructor(
    @Inject(DATA_SERVICE_ALIASES.auth) protected authDataService: AuthDataService,
    protected formBuilder: FormBuilder,
    protected router: Router,
    protected snackBarService: MatSnackBar,
    protected authService: AuthService
  ) {
    this.cargando = true;
    this.esconderClave = true;

    this.loginForm = this.formBuilder.group({
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

    this.authDataService.abrirSesion(usr).pipe(
      finalize(() => { this.cargando = false; })
    ).subscribe(
      (ssn: Sesion) => {
        if (!ssn || !ssn.hashSesion) {
          this.snackBarService.open('Credenciales invalidas.', 'OK', { duration: -1 });
        } else if (!ssn.idEmpleado) {
          this.snackBarService.open('Su cuenta no posee privilegios suficientes para ingresar.', 'OK', { duration: -1 });
        } else {
          this.authService.sesion = ssn;
          this.router.navigateByUrl('/gestion');
        }
      },
      () => {
        this.snackBarService.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
      }
    );
  }

}
