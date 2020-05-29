import { Component, EventEmitter, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ListadoGestionComponent } from 'src/app/gestion/listado-gestion.abstract-component';
import { Usuario } from 'src/models/entities/Usuario';

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

  @ViewChild('tabla', { static: true }) public tabla: MatTable<Usuario>;

  constructor(

  ) {
    super();
    this.editar = new EventEmitter<Usuario>();
    this.borrar = new EventEmitter<Usuario>();

    this.columnasTabla = [ 'nombre', 'fechaCreacion', 'nombreCompleto', 'rut', 'acciones' ];
  }
}
