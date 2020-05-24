import { ApplicationRef, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { MSJ_ERROR_COMM_SRV, REACTIVE_FORMS_ISOLATE } from 'src/app/compartido/constantes';
import { FormularioDatosPersonaComponent } from 'src/app/compartido/formulario-datos-persona/formulario-datos-persona.component';
import { EmpleadosHttpService } from 'src/http-services/empleados-http.service';
import { GestionSharedHttpService } from 'src/http-services/gestion-shared-http.service';
import { Cargo } from 'src/modelo/Cargo';
import { Empleado } from 'src/modelo/Empleado';


export interface EmpleadoFormularioDialogData {
  empleado: Empleado;
}

@Component({
  selector: 'app-empleados-formulario-dialog',
  templateUrl: './formulario-empleado.component.html',
  styleUrls: [
    '../../compartido/formularios.css',
    './formulario-empleado.component.css'
  ]
})
export class EmpleadoFormularioDialogComponent implements OnInit {

  public empleado: Empleado;

  public cargos$: Observable<Cargo[]>;
  public cargando: boolean;
  public guardando: boolean;

  public cargo: FormControl;
  @ViewChild('personaForm', { static: true }) public personaForm: FormularioDatosPersonaComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: EmpleadoFormularioDialogData,
    protected appRef: ApplicationRef,
    protected dialogRef: MatDialogRef<EmpleadoFormularioDialogComponent>,
    protected snackBar: MatSnackBar,
    protected fb: FormBuilder,
    protected sharedSvc: GestionSharedHttpService,
    protected httpSvc: EmpleadosHttpService
  ) {
    this.cargando = true;
    this.guardando = false;

    this.cargo = this.fb.control(undefined, Validators.required);

    this.Empleado = (this.data && this.data.empleado) ? this.data.empleado : new Empleado();

    this.cargando = false;
  }

  protected get formularioCompleto(): FormGroup {
    const group = this.personaForm ? [this.cargo, this.personaForm.formGroup] : [this.cargo];
    return this.fb.group(group);
  }

  public get esNuevo() { return this.empleado ? isNaN(this.empleado.idEmpleado) : true; }

  ngOnInit() {
    this.cargos$ = this.sharedSvc.cargos();
  }

  protected cargarEmpleado(emp: Empleado): void {
    this.empleado = emp;
    if (emp.idCargo) {
      this.cargo.setValue(emp.idCargo);
    }
  }

  protected guardarEmpleado(emp: Empleado): void {
    this.formularioCompleto.disable(REACTIVE_FORMS_ISOLATE);
    this.guardando = true;

    this.httpSvc.guardarEmpleado(emp).subscribe(
      (id: number) => {
        if (id) {
          if (emp.idEmpleado) {
            this.snackBar.open('Empleado \'' + emp.nombreCompletoPersona + '\' actualizado/a exitosamente.');
          } else {
            this.snackBar.open('Empleado \'' + emp.nombreCompletoPersona + '\' registrado/a exitosamente.');
          }
          emp.idEmpleado = id;
          this.dialogRef.close(emp);
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
      idEmpleado: this.empleado.idEmpleado ? this.empleado.idEmpleado : null,
      idPersona: this.empleado.idPersona ? this.empleado.idPersona : null,
      idCargo: this.cargo.value
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
