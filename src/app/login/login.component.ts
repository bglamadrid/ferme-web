import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/services/auth.service';
import { AuthHttpService } from 'src/http-services/auth.service';
import { Observable, of, Subject } from 'rxjs';
import { Sesion } from 'src/modelo/Sesion';
import { Router } from '@angular/router';

export interface Login {
  usuario: string;
  clave: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  protected _showSpinnerSource: Subject<boolean>;
  public showSpinner$: Observable<boolean>;
  public esconderClave: boolean;

  constructor(
    protected fb: FormBuilder,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected authSvc: AuthService,
    protected authHttpSvc: AuthHttpService
  ) { 
    this._showSpinnerSource = new Subject<boolean>();
    this.showSpinner$ = this._showSpinnerSource.asObservable();

    this.esconderClave = true;

    this.loginForm = this.fb.group({
      usuario: ["", Validators.required],
      clave: ["", Validators.required]
    });
  }

  public get usuario() { return this.loginForm.get("usuario"); }
  public get clave() { return this.loginForm.get("clave"); }

  public get iconoBotonMostrarClave(): string { return this.esconderClave? "visibility" : "visibility_off"; }
  public get claveInputType(): string { return this.esconderClave? "password" : "text"; }

  ngOnInit() {
  }

  public onClickAceptar(): void {
    this._showSpinnerSource.next(true);

    const usr: Login = {
      usuario: this.usuario.value,
      clave: this.clave.value
    };
    
    this.authHttpSvc.abrirSesion(usr).subscribe(
      (ssn: Sesion) => {
        if (!ssn || !ssn.hashSesion) {
          this.snackBar.open("Credenciales inválidas.");
        } else {
          console.log(ssn);
          
          this.authSvc.sesion = ssn;
          this.router.navigateByUrl("/gestion");
        }
        
      },
      err => {
        console.log(err);
        this.snackBar.open("Hubo un problema al autenticar.");
      },
      () => { 
        this._showSpinnerSource.next(false);
      }
    );
  }

}
