import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Persona } from 'src/modelo/Persona';
import { REACTIVE_FORMS_ISOLATE } from 'src/app/compartido/constantes';

@Component({
  selector: 'app-formulario-datos-persona',
  templateUrl: './formulario-datos-persona.component.html',
  styleUrls: [
    '../formularios.css',
    './formulario-datos-persona.component.css'
  ]
})
export class FormularioDatosPersonaComponent {

  public cssGridlayout: string;
  public formGroup: FormGroup;


  private get defaultCssGridLayout(): string {
    return '\'nombre nombre nombre\''
    + '\'rut rut rut\''
    + '\'direccion direccion email\''
    + '\'fono1 fono2 fono3\'';
  }

  constructor(
    protected fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      nombre: ['', Validators.required],
      rut: ['', Validators.required],
      direccion: [''],
      email: [''],
      fono1: [''],
      fono2: [''],
      fono3: ['']
    });
    this.cssGridlayout = this.defaultCssGridLayout;
  }

  public get nombre() { return this.formGroup.get('nombre'); }
  public get rut() { return this.formGroup.get('rut'); }
  public get direccion() { return this.formGroup.get('direccion'); }
  public get email() { return this.formGroup.get('email'); }
  public get fono1() { return this.formGroup.get('fono1'); }
  public get fono2() { return this.formGroup.get('fono2'); }
  public get fono3() { return this.formGroup.get('fono3'); }

  public get persona(): Persona {
    if (this.formGroup.invalid) {
      return undefined;
    } else {
      return {
        idPersona: null,
        nombreCompletoPersona: this.nombre.value,
        rutPersona: this.rut.value,
        direccionPersona: this.direccion.value,
        emailPersona: this.email.value,
        fonoPersona1: this.fono1.value,
        fonoPersona2: this.fono2.value,
        fonoPersona3: this.fono3.value,
      };
    }
  }

  @Input() public set CssGridLayout(layout: string) {
    this.cssGridlayout = layout;
  }

  @Input() public set Persona(prs: Persona) {

    this.nombre.setValue(prs.nombreCompletoPersona, REACTIVE_FORMS_ISOLATE);
    this.rut.setValue(prs.rutPersona, REACTIVE_FORMS_ISOLATE);

    if (prs.direccionPersona) {
      this.direccion.setValue(prs.direccionPersona, REACTIVE_FORMS_ISOLATE);
    }
    if (prs.emailPersona) {
      this.email.setValue(prs.emailPersona, REACTIVE_FORMS_ISOLATE);
    }
    if (prs.fonoPersona1) {
      this.fono1.setValue(String(prs.fonoPersona1), REACTIVE_FORMS_ISOLATE);
    }
    if (prs.fonoPersona2) {
      this.fono2.setValue(String(prs.fonoPersona2), REACTIVE_FORMS_ISOLATE);
    }
    if (prs.fonoPersona3) {
      this.fono3.setValue(String(prs.fonoPersona3), REACTIVE_FORMS_ISOLATE);
    }
  }


}
