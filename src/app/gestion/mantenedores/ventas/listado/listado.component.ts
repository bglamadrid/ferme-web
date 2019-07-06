import { Component, ViewChild, EventEmitter } from '@angular/core';
import { MatTable } from '@angular/material';
import { Venta } from 'src/modelo/Venta';
import { ListadoGestionComponent } from 'src/app/gestion/compartido/listado/listado.component';

@Component({
  selector: 'app-ventas-listado',
  templateUrl: './listado.component.html',
  styleUrls: [
    '../../../compartido/formularios.css',
    './listado.component.css'
  ]
})
export class VentasListadoComponent 
  extends ListadoGestionComponent<Venta> {

  @ViewChild("tabla") public tabla: MatTable<Venta>;

  constructor(

  ) { 
    super();
    this.editar = new EventEmitter<Venta>();
    this.borrar = new EventEmitter<Venta>();

    this.columnasTabla = [ "numero", "fecha", "acciones" ];
  }
}
