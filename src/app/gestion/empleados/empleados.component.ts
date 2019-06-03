import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Empleado } from 'src/models/Empleado';
import { EmpleadosService } from './empleados.service';
import { EmpleadosListadoComponent } from './listado/listado.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EmpleadoFormularioComponent } from './formulario/formulario.component';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  public empleados$: Observable<Empleado[]>;
  public loading$: Observable<boolean>;

  @ViewChild("listado") public listado: EmpleadosListadoComponent;

  constructor(
    private localSvc: EmpleadosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.cargarEmpleados();
  }

  private cargarEmpleados(): Observable<Empleado[]> {
    this.loading$ = of(true);
    let empleados: Observable<Empleado[]> = this.localSvc.listarEmpleados();
    empleados.subscribe((payload: Empleado[]) => {
      this.empleados$ = of(payload);
    }, err => {
      console.log(err);
      this.empleados$ = of([]);
    }, () => {
      this.loading$ = of(false);
    });
    return from(empleados);
  }

  public onRecargar(): void {
    this.cargarEmpleados();
  }

  public onClickAgregarEmpleado(): void {
    this.dialog.open(EmpleadoFormularioComponent, {
      width: "40rem",
      height: "40rem"
    }).afterClosed().subscribe(
      (nuevo: Empleado) => {
        if (nuevo) {
          this.cargarEmpleados();
        }
      }
    );
  }

}
