import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatTable } from '@angular/material';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { Proveedor } from 'src/modelo/Proveedor';
import { ListadoGestionComponent } from 'src/app/gestion/compartido/listado/listado.component';

@Component({
  selector: 'app-proveedores-listado',
  templateUrl: './listado.component.html',
  styleUrls: [
    '../../../compartido/formularios.css',
    './listado.component.css'
  ]
})
export class ProveedoresListadoComponent 
  extends ListadoGestionComponent<Proveedor> {

  @ViewChild("tabla", { static: true }) public tabla: MatTable<Proveedor>;

  constructor(

  ) { 
    super();
    this.editar = new EventEmitter<Proveedor>();
    this.borrar = new EventEmitter<Proveedor>();

    this.columnasTabla = [ "nombre", "rut", "acciones" ];
  }
}
