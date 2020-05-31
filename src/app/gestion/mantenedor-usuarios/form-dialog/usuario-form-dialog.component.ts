import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { REACTIVE_FORMS_ISOLATE } from 'src/app/shared/constantes';
import { EntityDataService } from 'src/data/entity.data.iservice';
import { SharedHttpDataService } from 'src/data/http/shared.http-data.service';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';
import { Persona } from 'src/models/Persona';
import { Usuario } from 'src/models/entities/Usuario';

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
    @Inject(DATA_SERVICE_ALIASES.shared) protected sharedSvc: SharedHttpDataService,
    @Inject(DATA_SERVICE_ALIASES.users) protected httpSvc: EntityDataService<Usuario>
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
    this.sharedSvc.readAllPersonas().subscribe(prs => { this.personas$ = of(prs); });
  }

  protected cargarUsuario(usr: Usuario): void {
    this.usuarioForm.disable(REACTIVE_FORMS_ISOLATE);
    this.cargando = true;

    if (usr.id) {
      this.privIdUsuario = usr.id;
      this.clave.setValidators(null);
    }

    this.nombre.setValue(usr.nombre, REACTIVE_FORMS_ISOLATE);
    this.persona.setValue(usr.idPersona, REACTIVE_FORMS_ISOLATE);

    this.cargando = false;
    this.usuarioForm.enable();
  }

  protected guardarUsuario(usr: Usuario): void {
    this.usuarioForm.disable(REACTIVE_FORMS_ISOLATE);
    this.cargando = true;

    this.httpSvc.create(usr).subscribe(
      (usr2: Usuario) => {
        // TODO: make sure prod2 is not actually prod
        if (usr2.id) {
          if (usr.id) {
            this.snackBar.open('Usuario \'' + usr.nombre + '\' actualizado/a exitosamente.');
          } else {
            this.snackBar.open('Usuario \'' + usr2.nombre + '\' registrado/a exitosamente.');
          }
          this.self.close(usr2);
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
    nuevo.id = this.privIdUsuario ? this.privIdUsuario : null,
    nuevo.nombre = this.nombre.value;
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
