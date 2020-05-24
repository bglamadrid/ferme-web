import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatTable } from '@angular/material';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { Empleado } from 'src/modelo/Empleado';
import { ListadoGestionComponent } from 'src/app/gestion/compartido/listado/listado.component';

@Component({
  selector: 'app-empleados-listado',
  templateUrl: './listado.component.html',
  styleUrls: [
    '../../../compartido/formularios.css',
    './listado.component.css'
  ]
})
export class EmpleadosListadoComponent 
  extends ListadoGestionComponent<Empleado> {

  @ViewChild("tabla", { static: true }) public tabla: MatTable<Empleado>;

  constructor(

  ) { 
    super();
    this.editar = new EventEmitter<Empleado>();
    this.borrar = new EventEmitter<Empleado>();

    this.columnasTabla = [ "nombre", "rut", "acciones" ];
  }
}
