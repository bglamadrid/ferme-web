import { Component, EventEmitter, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ListadoGestionComponent } from 'src/app/gestion/listado-gestion.abstract-component';
import { Producto } from 'src/models/entities/Producto';

@Component({
  selector: 'app-listado-productos-gestion',
  templateUrl: './listado-productos.component.html',
  styleUrls: [
    '../../../../assets/styles/formularios.css',
    './listado-productos.component.css'
  ]
})
export class ListadoProductosGestionComponent
  extends ListadoGestionComponent<Producto> {

  @ViewChild('tabla', { static: true }) public tabla: MatTable<Producto>;
  public columnasTabla: string[] = [ 'nombre', 'codigo', 'precio', 'stockActual', 'stockCritico', 'tipo', 'acciones' ];

  constructor() {
    super();
    this.editar = new EventEmitter<Producto>();
    this.borrar = new EventEmitter<Producto>();
  }
}
