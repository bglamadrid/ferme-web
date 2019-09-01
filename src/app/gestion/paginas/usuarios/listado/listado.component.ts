import { Component, ViewChild, EventEmitter } from '@angular/core';
import { MatTable } from '@angular/material';
import { Usuario } from 'src/modelo/Usuario';
import { ListadoGestionComponent } from 'src/app/gestion/compartido/listado/listado.component';

@Component({
  selector: 'app-usuarios-listado',
  templateUrl: './listado.component.html',
  styleUrls: [
    '../../../compartido/formularios.css',
    './listado.component.css'
  ]
})
export class UsuariosListadoComponent 
  extends ListadoGestionComponent<Usuario> {

  @ViewChild("tabla") public tabla: MatTable<Usuario>;

  constructor(

  ) { 
    super();
    this.editar = new EventEmitter<Usuario>();
    this.borrar = new EventEmitter<Usuario>();

    this.columnasTabla = [ "nombre", "fechaCreacion", "nombreCompleto", "rut", "acciones" ];
  }
}
