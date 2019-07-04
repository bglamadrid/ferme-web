import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef } from '@angular/material';

import { AuthService } from 'src/services/auth.service';
import { AuthHttpService } from 'src/http-services/auth.service';

import { LoginComponent, Login } from 'src/app/login/login.component';
import { Sesion } from 'src/modelo/Sesion';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class CompraLoginDialogComponent extends LoginComponent implements OnInit {

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
          this.authSvc.sesion = ssn;
          this.dialogRef.close();
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

  public onClickCancelar(): void {
    this.dialogRef.close();
  }

}
