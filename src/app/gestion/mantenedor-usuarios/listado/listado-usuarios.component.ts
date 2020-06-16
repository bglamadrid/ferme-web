import { Component } from '@angular/core';
import { ListadoGestionComponent } from 'src/app/gestion/listado-gestion.abstract-component';
import { Usuario } from 'src/models/entities/Usuario';
import { MantenedorUsuariosGestionService } from '../mantenedor-usuarios.service';

@Component({
  selector: 'app-listado-usuarios-gestion',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: [
    '../../../../assets/styles/formularios.css',
    './listado-usuarios.component.css'
  ]
})
export class ListadoUsuariosGestionComponent
  extends ListadoGestionComponent<Usuario> {

  public columnasTabla: string[] = [ 'nombre', 'fechaCreacion', 'nombreCompleto', 'rut', 'acciones' ];

  constructor(
    protected service: MantenedorUsuariosGestionService
  ) {
    super();
  }
}
