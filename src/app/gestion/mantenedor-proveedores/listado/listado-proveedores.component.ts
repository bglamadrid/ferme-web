import { Component, EventEmitter, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ListadoGestionComponent } from 'src/app/gestion/listado-gestion.abstract-component';
import { Proveedor } from 'src/models/entities/Proveedor';

@Component({
  selector: 'app-listado-proveedores-gestion',
  templateUrl: './listado-proveedores.component.html',
  styleUrls: [
    '../../../../assets/styles/formularios.css',
    './listado-proveedores.component.css'
  ]
})
export class ListadoProveedoresGestionComponent
  extends ListadoGestionComponent<Proveedor> {

  @ViewChild('tabla', { static: true }) public tabla: MatTable<Proveedor>;
  public columnasTabla: string[] = [ 'nombre', 'rut', 'acciones' ];

  constructor() {
    super();
    this.editar = new EventEmitter<Proveedor>();
    this.borrar = new EventEmitter<Proveedor>();
  }
}
