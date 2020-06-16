import { Component } from '@angular/core';
import { ListadoGestionComponent } from 'src/app/gestion/listado-gestion.abstract-component';
import { Venta } from 'src/models/entities/Venta';
import { MantenedorVentasGestionService } from '../mantenedor-ventas.service';

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

  public columnasTabla: string[] = [ 'numero', 'fecha', 'acciones' ];

  constructor(
    protected service: MantenedorVentasGestionService
  ) {
    super();
  }
}
