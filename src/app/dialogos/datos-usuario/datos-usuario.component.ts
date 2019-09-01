import { Component, Inject, ViewChild } from '@angular/core';
import { Persona } from 'src/modelo/Persona';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormularioDatosPersonaComponent } from 'src/app/compartido/formulario-datos-persona/formulario-datos-persona.component';
import { AuthHttpService } from 'src/http-services/auth-http.service';
import { finalize } from 'rxjs/operators';

export interface DatosUsuarioDialogData {
  persona: Persona;
}

export const TIEMPO_CONFIRMACION_SALIR = 2000;

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioDialogComponent<T extends Persona> {

  public cancelar: boolean;
  public guardando: boolean;

  @ViewChild('formularioPersona') public formularioPersona: FormularioDatosPersonaComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DatosUsuarioDialogData,
    protected dialogRef: MatDialogRef<DatosUsuarioDialogComponent<T>>,
    protected snackBar: MatSnackBar,
    protected httpSvc: AuthHttpService
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
