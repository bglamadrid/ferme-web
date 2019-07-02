import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Empleado } from 'src/models/Empleado';
import { EmpleadosListadoComponent } from './listado/listado.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EmpleadoFormularioComponent, EmpleadoFormularioDialogData } from './formulario/formulario.component';
import { EmpleadosHttpService } from 'src/http-services/empleados.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: [
    '../../../assets/gestion-pages.css',
    './empleados.component.css'
  ]
})
export class EmpleadosComponent implements OnInit {

  public empleados$: Observable<Empleado[]>;
  public loading$: Observable<boolean>;
  public busy$: Observable<boolean>;

  @ViewChild("listado") public listado: EmpleadosListadoComponent;

  constructor(
    private httpSvc: EmpleadosHttpService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { 
    this.loading$ = of(true);
    this.busy$ = of(true);
  }

  ngOnInit() {
    this.cargarEmpleados();
  }

  private cargarEmpleados(): Observable<Empleado[]> {
    this.loading$ = of(true);
    let empleados: Observable<Empleado[]> = this.httpSvc.listarEmpleados();
    empleados.subscribe((payload: Empleado[]) => {
      this.empleados$ = of(payload);
    }, err => {
      console.log(err);
      this.empleados$ = of([]);
    }, () => {
      this.loading$ = of(false);
      this.busy$ = of(false);
    });
    return from(empleados);
  }

  public onClickAgregar(): void {
    this.busy$ = of(true);
    this.dialog.open(EmpleadoFormularioComponent, {
      width: "40rem",
      height: "28rem"
    }).afterClosed().subscribe(
      (nuevo: Empleado) => {
        if (nuevo) {
          this.cargarEmpleados();
        }
      },
      err => { console.log(err); },
      () => { this.busy$ = of(false); }
    );
  }

  public onClickEditar(emp: Empleado): void {
    this.busy$ = of(true);
    const dialogData: EmpleadoFormularioDialogData = {
      empleado: emp
    };

    this.dialog.open(EmpleadoFormularioComponent, {
      width: "40rem",
      height: "28rem",
      data: dialogData
    }).afterClosed().subscribe(
      (editado: Empleado) => {
        if (editado) {
          this.cargarEmpleados();
        }
      },
      err => { console.log(err); },
      () => { this.busy$ = of(false); }
    );
  }

  public onClickBorrar(emp: Empleado) {
    this.busy$ = of(true);
    this.httpSvc.borrarEmpleado(emp.idEmpleado).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open("Empleado '"+emp.nombreCompletoPersona+"' eliminado.");
          this.cargarEmpleados();
        } else {
          this.snackBar.open("Hubo un problema al borrar el empleado.");
        }
      },
      err => { 
        this.snackBar.open("Hubo un problema de comunicación con el servidor. Por favor, inténtelo nuevamente.");
        console.log(err);
       },
       () => { this.busy$ = of(false); }
    );
  }

}
