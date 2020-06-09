import { Component, EventEmitter, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ListadoGestionComponent } from 'src/app/gestion/listado-gestion.abstract-component';
import { Venta } from 'src/models/entities/Venta';

@Component({
  selector: 'app-listado-ventas-gestion',
  templateUrl: './listado-ventas.component.html',
  styleUrls: [
    '../../../../assets/styles/formularios.css',
    './listado-ventas.component.css'
  ]
})
export class ListadoVentasGestionComponent
  extends ListadoGestionComponent<Venta> {

  @ViewChild('tabla', { static: true }) public tabla: MatTable<Venta>;
  public columnasTabla: string[] = [ 'numero', 'fecha', 'acciones' ];

  constructor() {
    super();
    this.editar = new EventEmitter<Venta>();
    this.borrar = new EventEmitter<Venta>();
  }
}
