import { Component, EventEmitter, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ListadoGestionComponent } from 'src/app/gestion/listado-gestion.abstract-component';
import { OrdenCompra } from 'src/models/OrdenCompra';

@Component({
  selector: 'app-listado-ordenes_compra-gestion',
  templateUrl: './listado-ordenes_compra.component.html',
  styleUrls: [
    '../../../../assets/styles/formularios.css',
    './listado-ordenes_compra.component.css'
  ]
})
export class ListadoOrdenesCompraGestionComponent
  extends ListadoGestionComponent<OrdenCompra> {

  @ViewChild('tabla', { static: true }) public tabla: MatTable<OrdenCompra>;

  constructor(

  ) {
    super();
    this.editar = new EventEmitter<OrdenCompra>();
    this.borrar = new EventEmitter<OrdenCompra>();

    this.columnasTabla = [ 'numero', 'fechaSolicitud', 'fechaRecepcion', 'acciones' ];
  }
}
