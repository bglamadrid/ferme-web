import { Component } from '@angular/core';
import { ListadoGestionComponent } from 'src/app/gestion/listado-gestion.abstract-component';
import { Proveedor } from 'src/models/entities/Proveedor';
import { MantenedorProveedoresGestionService } from '../mantenedor-proveedores.service';

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

  public columnasTabla: string[] = [ 'nombre', 'rut', 'acciones' ];

  constructor(
    protected service: MantenedorProveedoresGestionService
  ) {
    super();
  }
}
