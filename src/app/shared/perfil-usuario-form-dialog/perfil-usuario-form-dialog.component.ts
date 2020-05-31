import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { DatosPersonaFormComponent } from 'src/app/shared/datos-persona-form/datos-persona-form.component';
import { AuthDataService } from 'src/data/auth.data.iservice';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';
import { Persona } from 'src/models/entities/Persona';

export interface PerfilUsuarioFormDialogData {
  persona: Partial<Persona>;
}

export const TIEMPO_CONFIRMACION_SALIR = 2000;

@Component({
  selector: 'app-perfil-usuario-form-dialog',
  templateUrl: './perfil-usuario-form-dialog.component.html',
  styleUrls: ['./perfil-usuario-form-dialog.component.css']
})
export class PerfilUsuarioFormDialogComponent<T extends Persona> {

  public cancelar: boolean;
  public guardando: boolean;

  @ViewChild('formularioPersona', { static: true }) public formularioPersona: DatosPersonaFormComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PerfilUsuarioFormDialogData,
    protected dialogRef: MatDialogRef<PerfilUsuarioFormDialogComponent<T>>,
    protected snackBar: MatSnackBar,
    @Inject(DATA_SERVICE_ALIASES.auth) protected httpSvc: AuthDataService,
  ) {
    this.cancelar = false;
    this.guardando = false;
  }

  public get colorBotonCancelar(): string { return this.cancelar ? 'warn' : 'default'; }

  protected guardarDatos(objetoDatos: T): void {
    this.guardando = true;

    this.httpSvc.actualizarPerfil(objetoDatos).pipe(
      finalize(() => { this.guardando = false; })
    ).subscribe(
      () => {
        if (objetoDatos.idPersona) {
          this.snackBar.open('Sus datos fueron registrados exitosamente');
        } else {
          this.snackBar.open('Sus datos fueron actualizados exitosamente');
        }
        this.dialogRef.close(objetoDatos);
      }, () => {
        this.snackBar.open('Error al guardar usuario.', 'OK', {duration: -1});
      }
    );
  }

  public onClickAceptar(): void {
    const datosUsuario = this.formularioPersona.persona as T;
    if (!datosUsuario) {
      this.snackBar.open('Hay campos sin rellenar', 'OK', { duration: -1 });
      return null;
    } else {
      datosUsuario.idPersona = this.data.persona.idPersona;
      this.guardarDatos(datosUsuario);
    }
  }

  public onClickCancelar(): void {
    if (!this.cancelar) {
      this.cancelar = true;
      setTimeout(() => { this.cancelar = false; }, TIEMPO_CONFIRMACION_SALIR);
    } else {
      this.dialogRef.close(null);
    }
  }

}
