import { Component, EventEmitter, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ListadoGestionComponent } from 'src/app/gestion/listado-gestion.abstract-component';
import { Empleado } from 'src/models/entities/Empleado';

@Component({
  selector: 'app-listado-empleados-gestion',
  templateUrl: './listado-empleados.component.html',
  styleUrls: [
    '../../../../assets/styles/formularios.css',
    './listado-empleados.component.css'
  ]
})
export class ListadoEmpleadosGestionComponent
  extends ListadoGestionComponent<Empleado> {

  @ViewChild('tabla', { static: true }) public tabla: MatTable<Empleado>;
  public columnasTabla: string[] = [ 'nombre', 'rut', 'acciones' ];

  constructor() {
    super();
    this.editar = new EventEmitter<Empleado>();
    this.borrar = new EventEmitter<Empleado>();
  }
}
