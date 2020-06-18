import { ApplicationRef, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
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
import { Empleado } from 'src/models/entities/Empleado';


export interface EmpleadoFormDialogGestionData {
  empleado: Empleado;
}

@Component({
  selector: 'app-empleado-form-dialog-gestion',
  templateUrl: './empleado-form-dialog.component.html',
  styleUrls: [
    '../../../../assets/styles/formularios.css',
    './empleado-form-dialog.component.css'
  ]
})
export class EmpleadoFormDialogGestionComponent
  implements OnInit {

  public empleado: Empleado;

  public cargos$: Observable<Cargo[]>;
  public cargando: boolean;
  public guardando: boolean;

  public cargo: FormControl;
  @ViewChild('personaForm', { static: true }) public personaForm: DatosPersonaFormComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: EmpleadoFormDialogGestionData,
    @Inject(DATA_SERVICE_ALIASES.shared) protected sharedDataService: SharedDataService,
    @Inject(DATA_SERVICE_ALIASES.employees) protected employeeDataService: EntityDataService<Empleado>,
    protected dialog: MatDialogRef<EmpleadoFormDialogGestionComponent>,
    protected snackBarService: MatSnackBar,
    protected formBuilder: FormBuilder
  ) {
    this.cargando = false;
    this.guardando = false;

    this.cargo = this.formBuilder.control(undefined, Validators.required);


    const item: Empleado = (data?.empleado) ? data.empleado : new Empleado();
    this.cargarEmpleado(item);
  }

  public get formularioCompleto(): FormGroup {
    const group = this.personaForm ? [this.cargo, this.personaForm.formGroup] : [this.cargo];
    return this.formBuilder.group(group);
  }

  public get esNuevo() { return this.empleado ? isNaN(this.empleado.id) : true; }

  ngOnInit() {
    this.cargos$ = this.sharedDataService.readAllCargos();
  }

  protected cargarEmpleado(emp: Empleado): void {
    this.empleado = emp;
    if (emp.id) {
      this.cargo.setValue(emp.id);
    }
  }

  protected guardarEmpleado(emp: Empleado): void {
    this.formularioCompleto.disable(REACTIVE_FORMS_ISOLATE);
    this.guardando = true;

    this.employeeDataService.create(emp).subscribe(
      (emp2: Empleado) => {
        // TODO: make sure emp2 is not actually emp
        if (emp2.id) {
          if (emp.id) {
            this.snackBarService.open('Empleado \'' + emp.nombre + '\' actualizado/a exitosamente.');
          } else {
            this.snackBarService.open('Empleado \'' + emp2.nombre + '\' registrado/a exitosamente.');
          }
          this.dialog.close(emp2);
        } else {
          this.snackBarService.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
          this.formularioCompleto.enable(REACTIVE_FORMS_ISOLATE);
          this.guardando = false;
        }
      },
      err => {
        this.snackBarService.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
        this.formularioCompleto.enable(REACTIVE_FORMS_ISOLATE);
        this.guardando = false;
      }
    );
  }

  public onClickAceptar(): void {
    const datosEmpleado = {
      id: this.empleado.id ? this.empleado.id : null,
      idPersona: this.empleado.idPersona ? this.empleado.idPersona : null,
      idCargo: this.cargo.value,
      nombre: this.personaForm.nombre.value
    };
    const emp: Empleado = Object.assign(
      this.personaForm.persona,
      datosEmpleado
    );

    this.guardarEmpleado(emp);
  }

  public onClickCancelar(): void {
    this.dialog.close();
  }

}
