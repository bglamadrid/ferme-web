import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { Usuario } from 'src/models/Usuario';
import { UsuariosHttpService } from 'src/http-services/usuarios-http.service';
import { REACTIVE_FORMS_ISOLATE } from 'src/app/shared/constantes';
import { Persona } from 'src/models/Persona';
import { GestionSharedHttpService } from 'src/http-services/gestion-shared-http.service';

export interface UsuarioFormDialogGestionData {
  usuario: Usuario;
}

@Component({
  selector: 'app-usuario-form-dialog-gestion',
  templateUrl: './usuario-form-dialog.component.html',
  styleUrls: [
    '../../../../assets/styles/formularios.css',
    './usuario-form-dialog.component.css'
  ]
})
export class UsuarioFormDialogGestionComponent
  implements OnInit {

  protected privIdUsuario: number;

  public personas$: Observable<Persona[]>;
  public cargando: boolean;

  public usuarioForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) protected dialogData: UsuarioFormDialogGestionData,
    protected self: MatDialogRef<UsuarioFormDialogGestionComponent>,
    protected snackBar: MatSnackBar,
    protected fb: FormBuilder,
    protected sharedSvc: GestionSharedHttpService,
    protected httpSvc: UsuariosHttpService
  ) {
    this.cargando = false;

    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      clave: [''],
      persona: [undefined, Validators.required]
    });

    if (this.dialogData) {
      const usr: Usuario = this.dialogData.usuario;
      if (usr) { this.cargarUsuario(usr); }
    }
  }

  public get nombre() { return this.usuarioForm.get('nombre'); }
  public get clave() { return this.usuarioForm.get('clave'); }
  public get persona() { return this.usuarioForm.get('persona'); }

  public get esNuevo() { return isNaN(this.privIdUsuario); }

  ngOnInit() {
    this.sharedSvc.personas().subscribe(prs => { this.personas$ = of(prs); });
  }

  protected cargarUsuario(usr: Usuario): void {
    this.usuarioForm.disable(REACTIVE_FORMS_ISOLATE);
    this.cargando = true;

    if (usr.idUsuario) {
      this.privIdUsuario = usr.idUsuario;
      this.clave.setValidators(null);
    }

    this.nombre.setValue(usr.nombreUsuario, REACTIVE_FORMS_ISOLATE);
    this.persona.setValue(usr.idPersona, REACTIVE_FORMS_ISOLATE);

    this.cargando = false;
    this.usuarioForm.enable();
  }

  protected guardarUsuario(usr: Usuario): void {
    this.usuarioForm.disable(REACTIVE_FORMS_ISOLATE);
    this.cargando = true;

    this.httpSvc.guardarUsuario(usr).subscribe(
      (id: number) => {
        if (id) {
          if (usr.idUsuario) {
            this.snackBar.open('Usuario \'' + usr.nombreUsuario + '\' actualizado/a exitosamente.');
          } else {
            this.snackBar.open('Usuario \'' + usr.nombreUsuario + '\' registrado/a exitosamente.');
          }
          usr.idUsuario = id;
          this.self.close(usr);
        } else {
          this.snackBar.open('Error al guardar usuario.');
        }
      }, err => {
        console.log(err);
        this.snackBar.open('Error al guardar usuario.');
        this.cargando = false;
        this.usuarioForm.enable(REACTIVE_FORMS_ISOLATE);
      }
    );
  }

  public onClickAceptar(): void {
    const nuevo: Usuario = new Usuario();
    nuevo.idUsuario = this.privIdUsuario ? this.privIdUsuario : null,
    nuevo.nombreUsuario = this.nombre.value;
    if (this.clave.value) {
      nuevo.claveUsuario =  this.clave.value;
    }
    nuevo.idPersona = this.persona.value,

    this.guardarUsuario(nuevo);
  }

  public onClickCancelar(): void {
    this.self.close();
  }

  @Input() public set Usuario(usr: Usuario) {
    if (usr) {
      this.cargarUsuario(usr);
    } else {
      this.clave.setValidators(Validators.required);
      this.usuarioForm.reset();
    }
  }

}
