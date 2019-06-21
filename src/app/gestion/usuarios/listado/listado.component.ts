import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTable } from '@angular/material';
import { of, Observable } from 'rxjs';
import { Usuario } from 'src/models/Usuario';

@Component({
  selector: 'app-usuarios-listado',
  templateUrl: './listado.component.html',
  styleUrls: [
    '../../../../assets/gestion-listados.css',
    './listado.component.css'
  ]
})
export class UsuariosListadoComponent {

  @Output() public editar: EventEmitter<Usuario>;
  @Output() public borrar: EventEmitter<Usuario>;

  @ViewChild("tabla") public tabla: MatTable<Usuario>;
  public displayedColumns: string[];

  constructor(

  ) { 
    this.displayedColumns = [ "nombre", "fechaCreacion", "nombreCompleto", "rut", "acciones" ];
    this.editar = new EventEmitter();
    this.borrar = new EventEmitter();
  }

  public onClickVerUsuario(usr: Usuario) {
    this.editar.emit(usr);
  }

  public onClickBorrarUsuario(usr: Usuario) {
    this.borrar.emit(usr);
  }

  @Input() public busy$: Observable<boolean>;
  @Input() public set Usuarios(usuarios: Usuario[]) {
    this.tabla.dataSource = usuarios? of(usuarios) : of([]);
  }
}
