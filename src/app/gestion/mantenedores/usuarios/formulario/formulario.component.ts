import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Observable, of } from 'rxjs';
import { Usuario } from 'src/modelo/Usuario';
import { UsuariosHttpService } from 'src/http-services/usuarios.service';
import { REACTIVE_FORMS_ISOLATE as NO_EVENT_CHAIN } from 'src/app/compartido/constantes';
import { Persona } from 'src/modelo/Persona';
import { GestionSharedHttpService } from 'src/http-services/gestion-shared.service';

export interface UsuarioFormularioDialogData {
  usuario: Usuario;
}

@Component({
  selector: 'app-usuarios-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['../../../compartido/formularios.css']
})
export class UsuarioFormularioComponent implements OnInit {

  protected _idUsuario: number;

  public personas$: Observable<Persona[]>;
  public cargando$: Observable<boolean>;

  public usuarioForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) protected dialogData: UsuarioFormularioDialogData,
    protected self: MatDialogRef<UsuarioFormularioComponent>,
    protected snackBar: MatSnackBar,
    protected fb: FormBuilder,
    protected sharedSvc: GestionSharedHttpService,
    protected httpSvc: UsuariosHttpService
  ) { 
    this.cargando$ = of(false);

    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      clave: [''],
      persona: [null, Validators.required]
    });

    if (this.dialogData) {
      const usr: Usuario = this.dialogData.usuario;
      if (usr) { this.cargarUsuario(usr); }
    }
  }

  public get nombre() { return this.usuarioForm.get("nombre"); }
  public get clave() { return this.usuarioForm.get("clave"); }
  public get persona() { return this.usuarioForm.get("persona"); }

  public get esNuevo() { return isNaN(this._idUsuario); }

  ngOnInit() {
    this.sharedSvc.personas().subscribe(prs => { this.personas$ = of(prs); });
  }

  protected cargarUsuario(usr: Usuario): void {

    this.usuarioForm.disable(NO_EVENT_CHAIN);
    this.cargando$ = of(true);

    if (usr.idUsuario) {
      this._idUsuario = usr.idUsuario; 
      this.clave.setValidators(null);
    }

    this.nombre.setValue(usr.nombreUsuario, NO_EVENT_CHAIN);
    this.persona.setValue(usr.idPersona, NO_EVENT_CHAIN);

    this.cargando$ = of(false);
    this.usuarioForm.enable();
  }

  protected guardarUsuario(usr: Usuario): void {
    this.usuarioForm.disable(NO_EVENT_CHAIN);
    this.cargando$ = of(true);
    
    this.httpSvc.guardarUsuario(usr).subscribe(
      (id: number) => {
        if (id) {
          if (usr.idUsuario) {
            this.snackBar.open("Usuario '"+usr.nombreUsuario+"' actualizado/a exitosamente.");
          } else {
            this.snackBar.open("Usuario '"+usr.nombreUsuario+"' registrado/a exitosamente.");
          }
          usr.idUsuario = id;
          this.self.close(usr);
        } else {
          this.snackBar.open("Error al guardar usuario.");
        }
      }, err => {
        console.log(err);
        this.snackBar.open("Error al guardar usuario.");
        this.cargando$ = of(false);
        this.usuarioForm.enable(NO_EVENT_CHAIN);
      }
    );
  }

  public onClickAceptar(): void {
    let nuevo: Usuario = new Usuario();
    nuevo.idUsuario = this._idUsuario? this._idUsuario : null,
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
