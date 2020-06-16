import { Component } from '@angular/core';
import { ListadoGestionComponent } from 'src/app/gestion/listado-gestion.abstract-component';
import { OrdenCompra } from 'src/models/entities/OrdenCompra';
import { MantenedorOrdenesCompraGestionService } from '../mantenedor-ordenes-compra.service';

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

  public columnasTabla: string[] = [ 'numero', 'fechaSolicitud', 'fechaRecepcion', 'acciones' ];

  constructor(
    protected service: MantenedorOrdenesCompraGestionService
  ) {
    super();
  }
}
