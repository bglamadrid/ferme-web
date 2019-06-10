import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTable } from '@angular/material';
import { of, Observable } from 'rxjs';
import { Empleado } from 'src/models/Empleado';

@Component({
  selector: 'app-empleados-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class EmpleadosListadoComponent {

  @Output() public editar: EventEmitter<Empleado>;
  @Output() public borrar: EventEmitter<Empleado>;

  @ViewChild("tabla") public tabla: MatTable<Empleado>;
  public displayedColumns: string[];

  constructor(

  ) { 
    this.displayedColumns = [ "nombre", "rut", "acciones" ];
    this.editar = new EventEmitter();
    this.borrar = new EventEmitter();
  }

  public onClickVerEmpleado(emp: Empleado) {
    this.editar.emit(emp);
  }

  public onClickBorrarEmpleado(emp: Empleado) {
    this.editar.emit(emp);
  }

  @Input() public busy$: Observable<boolean>;
  @Input() public set Empleados(empleados: Empleado[]) {
    this.tabla.dataSource = empleados? of(empleados) : of([]);
  }
}
