import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTable, MatDialog, MatSnackBar } from '@angular/material';
import { of, Observable } from 'rxjs';
import { Empleado } from 'src/models/Empleado';
import { EmpleadoFormularioComponent, EmpleadoFormularioDialogData } from '../formulario/formulario.component';
import { EmpleadosHttpService } from 'src/http-services/empleados.service';

@Component({
  selector: 'app-empleados-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class EmpleadosListadoComponent {

  @Output() public editarEmpleado: EventEmitter<Empleado>;
  @Output() public borrarEmpleado: EventEmitter<Empleado>;

  @ViewChild("tabla") public tabla: MatTable<Empleado>;
  public displayedColumns: string[];

  constructor(

  ) { 
    this.displayedColumns = [ "nombre", "rut", "acciones" ];
    this.editarEmpleado = new EventEmitter();
    this.borrarEmpleado = new EventEmitter();
  }

  public onClickVerEmpleado(emp: Empleado) {
    this.editarEmpleado.emit(emp);
  }

  public onClickBorrarEmpleado(emp: Empleado) {
    this.editarEmpleado.emit(emp);
  }

  @Input() public busy$: Observable<boolean>;
  @Input() public set Empleados(empleados: Empleado[]) {
    this.tabla.dataSource = empleados? of(empleados) : of([]);
  }
}
