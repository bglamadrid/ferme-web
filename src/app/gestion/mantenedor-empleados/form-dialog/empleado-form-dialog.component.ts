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
    @Inject(MAT_DIALOG_DATA) protected data: EmpleadoFormDialogGestionData,
    protected appRef: ApplicationRef,
    protected dialogRef: MatDialogRef<EmpleadoFormDialogGestionComponent>,
    protected snackBar: MatSnackBar,
    protected fb: FormBuilder,
    @Inject(DATA_SERVICE_ALIASES.shared) protected sharedSvc: SharedDataService,
    @Inject(DATA_SERVICE_ALIASES.employees) protected httpSvc: EntityDataService<Empleado>,
  ) {
    this.cargando = true;
    this.guardando = false;

    this.cargo = this.fb.control(undefined, Validators.required);

    this.Empleado = (this.data && this.data.empleado) ? this.data.empleado : new Empleado();

    this.cargando = false;
  }

  public get formularioCompleto(): FormGroup {
    const group = this.personaForm ? [this.cargo, this.personaForm.formGroup] : [this.cargo];
    return this.fb.group(group);
  }

  public get esNuevo() { return this.empleado ? isNaN(this.empleado.id) : true; }

  ngOnInit() {
    this.cargos$ = this.sharedSvc.readAllCargos();
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

    this.httpSvc.create(emp).subscribe(
      (emp2: Empleado) => {
        // TODO: make sure emp2 is not actually emp
        if (emp2.id) {
          if (emp.id) {
            this.snackBar.open('Empleado \'' + emp.nombre + '\' actualizado/a exitosamente.');
          } else {
            this.snackBar.open('Empleado \'' + emp2.nombre + '\' registrado/a exitosamente.');
          }
          this.dialogRef.close(emp2);
        } else {
          this.snackBar.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
          this.formularioCompleto.enable(REACTIVE_FORMS_ISOLATE);
          this.guardando = false;
        }
      },
      err => {
        this.snackBar.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
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
    this.dialogRef.close();
  }

  @Input() public set Empleado(emp: Empleado) {
    if (emp) {
      this.cargarEmpleado(emp);
    } else {
      this.formularioCompleto.reset();
    }
  }

}
