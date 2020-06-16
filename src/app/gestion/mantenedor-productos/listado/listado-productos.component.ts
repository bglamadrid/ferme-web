import { Component } from '@angular/core';
import { ListadoGestionComponent } from 'src/app/gestion/listado-gestion.abstract-component';
import { Producto } from 'src/models/entities/Producto';
import { MantenedorProductosGestionService } from '../mantenedor-productos.service';

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

  public columnasTabla: string[] = [ 'nombre', 'codigo', 'precio', 'stockActual', 'stockCritico', 'tipo', 'acciones' ];

  constructor(
    protected service: MantenedorProductosGestionService
  ) {
    super();
  }
}
