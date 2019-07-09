import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Observable, of } from 'rxjs';
import { Cargo } from 'src/modelo/Cargo';
import { Empleado } from 'src/modelo/Empleado';
import { EmpleadosHttpService } from 'src/http-services/empleados.service';
import { REACTIVE_FORMS_ISOLATE as NO_EVENT_CHAIN } from 'src/app/compartido/constantes';
import { GestionSharedHttpService } from 'src/http-services/gestion-shared.service';


export interface EmpleadoFormularioDialogData {
  empleado: Empleado;
}

@Component({
  selector: 'app-empleados-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['../../../compartido/formularios.css']
})
export class EmpleadoFormularioComponent implements OnInit {

  protected _idEmpleado: number;
  protected _idPersona: number;

  public cargos$: Observable<Cargo[]>;
  public cargando$: Observable<boolean>;

  public empleadoForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) protected dialogData: EmpleadoFormularioDialogData,
    protected self: MatDialogRef<EmpleadoFormularioComponent>,
    protected snackBar: MatSnackBar,
    protected fb: FormBuilder,
    protected sharedSvc: GestionSharedHttpService,
    protected httpSvc: EmpleadosHttpService
  ) { 
    this.cargando$ = of(true);

    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      rut: ['', Validators.required],
      cargo: [null, Validators.required],
      direccion: [''],
      email: [''],
      fono1: [''],
      fono2: [''],  
      fono3: ['']
    });

    if (this.dialogData) {
      const emp: Empleado = this.dialogData.empleado;
      if (emp) { this.cargarEmpleado(emp); }
    }
  }

  public get nombre() { return this.empleadoForm.get("nombre"); }
  public get rut() { return this.empleadoForm.get("rut"); }
  public get cargo() { return this.empleadoForm.get("cargo"); }
  public get direccion() { return this.empleadoForm.get("direccion"); }
  public get email() { return this.empleadoForm.get("email"); }
  public get fono1() { return this.empleadoForm.get("fono1"); }
  public get fono2() { return this.empleadoForm.get("fono2"); }
  public get fono3() { return this.empleadoForm.get("fono3"); }

  public get esNueva() { return isNaN(this._idEmpleado); }

  ngOnInit() {
    this.cargos$ = this.sharedSvc.cargos();
  }

  protected cargarEmpleado(emp: Empleado): void {

    this.empleadoForm.disable(NO_EVENT_CHAIN);
    this.cargando$ = of(true);

    if (emp.idEmpleado) {
      this._idEmpleado = emp.idEmpleado; 
    }
    if (emp.idPersona) {
      this._idPersona = emp.idPersona;
    }

    this.nombre.setValue(emp.nombreCompletoPersona, NO_EVENT_CHAIN);
    this.rut.setValue(emp.rutPersona, NO_EVENT_CHAIN);
    this.cargo.setValue(emp.idCargo, NO_EVENT_CHAIN);

    if (emp.direccionPersona) {
      this.direccion.setValue(emp.direccionPersona, NO_EVENT_CHAIN);
    }
    if (emp.emailPersona) {
      this.email.setValue(emp.emailPersona, NO_EVENT_CHAIN);
    }
    if (emp.fonoPersona1) {
      this.fono1.setValue(String(emp.fonoPersona1), NO_EVENT_CHAIN);
    }
    if (emp.fonoPersona2) {
      this.fono2.setValue(String(emp.fonoPersona2), NO_EVENT_CHAIN);
    }
    if (emp.fonoPersona3) {
      this.fono3.setValue(String(emp.fonoPersona3), NO_EVENT_CHAIN);
    }

    this.cargando$ = of(false);
    this.empleadoForm.enable();
  }

  protected guardarEmpleado(emp: Empleado): void {
    this.empleadoForm.disable(NO_EVENT_CHAIN);
    this.cargando$ = of(true);
    
    this.httpSvc.guardarEmpleado(emp).subscribe(
      (id: number) => {
        if (id) {
          if (emp.idEmpleado) {
            this.snackBar.open("Empleado '"+emp.nombreCompletoPersona+"' actualizado/a exitosamente.");
          } else {
            this.snackBar.open("Empleado '"+emp.nombreCompletoPersona+"' registrado/a exitosamente.");
          }
          emp.idEmpleado = id;
          this.self.close(emp);
        } else {
          this.snackBar.open("Error al guardar empleado.");
        }
      }, err => {
        console.log(err);
        this.snackBar.open("Error al guardar empleado.");
        this.cargando$ = of(false);
        this.empleadoForm.enable(NO_EVENT_CHAIN);
      }
    );
  }

  public onClickAceptar(): void {
    let nuevo: Empleado = {
      idEmpleado: this._idEmpleado? this._idEmpleado : null,
      idPersona: this._idPersona? this._idPersona: null,
      idCargo: this.cargo.value,
      nombreCompletoPersona: this.nombre.value,
      rutPersona: this.rut.value,
      direccionPersona: this.direccion.value? this.direccion.value : null,
      emailPersona: this.email.value? this.email.value : null,
      fonoPersona1: this.fono1.value? this.fono1.value : null,
      fonoPersona2: this.fono2.value? this.fono2.value : null,
      fonoPersona3: this.fono3.value? this.fono3.value : null,
    };

    this.guardarEmpleado(nuevo);
  }

  public onClickCancelar(): void {
    this.self.close();
  }

  @Input() public set Empleado(emp: Empleado) {
    if (emp) {
      this.cargarEmpleado(emp);
    } else {
      this.empleadoForm.reset();
    }
  }

}
