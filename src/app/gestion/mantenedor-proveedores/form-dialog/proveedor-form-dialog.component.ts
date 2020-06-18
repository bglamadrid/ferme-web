import { Component, Inject, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { MSJ_ERROR_COMM_SRV, REACTIVE_FORMS_ISOLATE } from 'src/app/shared/constantes';
import { DatosPersonaFormComponent } from 'src/app/shared/datos-persona-form/datos-persona-form.component';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';
import { EntityDataService } from 'src/data/entity.data.iservice';
import { SharedDataService } from 'src/data/shared.data.iservice';
import { Cargo } from 'src/models/entities/Cargo';
import { Proveedor } from 'src/models/entities/Proveedor';

export interface ProveedorFormDialogGestionData {
  proveedor: Proveedor;
}

@Component({
  selector: 'app-proveedor-form-dialog-gestion',
  templateUrl: './proveedor-form-dialog.component.html',
  styleUrls: [
    '../../../../assets/styles/formularios.css',
    './proveedor-form-dialog.component.css'
  ]
})
export class ProveedorFormDialogGestionComponent {

  public proveedor: Proveedor;

  public cargos$: Observable<Cargo[]>;
  public cargando: boolean;
  public guardando: boolean;

  public razonSocial: FormControl;
  @ViewChild('personaForm', { static: true }) public personaForm: DatosPersonaFormComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: ProveedorFormDialogGestionData,
    @Inject(DATA_SERVICE_ALIASES.providers) protected dataService: EntityDataService<Proveedor>,
    @Inject(DATA_SERVICE_ALIASES.shared) protected sharedDataService: SharedDataService,
    protected dialog: MatDialogRef<ProveedorFormDialogGestionComponent>,
    protected snackBarService: MatSnackBar,
    protected formBuilder: FormBuilder
  ) {
    this.cargando = false;
    this.guardando = false;

    this.razonSocial = this.formBuilder.control('', Validators.required);

    const item: Proveedor = (data?.proveedor) ? data.proveedor : new Proveedor();
    this.cargarProveedor(item);
  }

  public get formularioCompleto(): FormGroup {
    const group = this.personaForm ? [this.razonSocial, this.personaForm.formGroup] : [this.razonSocial];
    return this.formBuilder.group(group);
  }

  public get esNuevo() { return this.proveedor ? isNaN(this.proveedor.id) : true; }


  protected cargarProveedor(prov: Proveedor): void {
    this.proveedor = prov;
    if (prov.razonSocial) {
      this.razonSocial.setValue(prov.razonSocial, REACTIVE_FORMS_ISOLATE);
    }
  }

  protected guardarProveedor(prov: Proveedor): void {
    this.formularioCompleto.disable(REACTIVE_FORMS_ISOLATE);
    this.guardando = true;

    this.dataService.create(prov).subscribe(
      (prov2: Proveedor) => {
        // TODO: make sure prod2 is not actually prod
        if (prov2.id) {
          if (prov.id) {
            this.snackBarService.open('Proveedor \'' + prov.nombre + '\' actualizado/a exitosamente.');
          } else {
            this.snackBarService.open('Proveedor \'' + prov2.nombre + '\' registrado/a exitosamente.');
          }
          this.dialog.close(prov2);
        } else {
          this.snackBarService.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
          this.formularioCompleto.enable(REACTIVE_FORMS_ISOLATE);
          this.guardando = false;
        }
      }, err => {
        this.snackBarService.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
        this.formularioCompleto.enable(REACTIVE_FORMS_ISOLATE);
        this.guardando = false;
      }
    );
  }

  public onClickAceptar(): void {
    const datosProveedor = {
      id: this.proveedor.id ? this.proveedor.id : null,
      idPersona: this.proveedor.idPersona ? this.proveedor.idPersona : null,
      razonSocial: this.razonSocial.value
    };
    const prov: Proveedor = Object.assign(
      this.personaForm.persona,
      datosProveedor
    );

    this.guardarProveedor(prov);
  }

  public onClickCancelar(): void {
    this.dialog.close();
  }

}
