import { Component, ViewChild, EventEmitter } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Producto } from 'src/modelo/Producto';
import { ListadoGestionComponent } from 'src/app/gestion/compartido/listado/listado.component';

@Component({
  selector: 'app-productos-listado',
  templateUrl: './listado.component.html',
  styleUrls: [
    '../../../compartido/formularios.css',
    './listado.component.css'
  ]
})
export class ProductosListadoComponent 
  extends ListadoGestionComponent<Producto> {
  
  @ViewChild("tabla", { static: true }) public tabla: MatTable<Producto>;

  constructor() { 
    super();
    this.editar = new EventEmitter<Producto>();
    this.borrar = new EventEmitter<Producto>();

    this.columnasTabla = [ "nombre", "codigo", "precio", "stockActual", "stockCritico", "tipo", "acciones" ];
  }
}
