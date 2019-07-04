import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatTable } from '@angular/material';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
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
export class UsuariosListadoComponent extends ListadoGestionComponent implements OnInit {

  @Output() public editar: EventEmitter<Usuario>;
  @Output() public borrar: EventEmitter<Usuario>;

  @ViewChild("tabla") public tabla: MatTable<Usuario>;
  protected _items: Usuario[];
  protected _itemsSource: BehaviorSubject<Usuario[]>;
  public items$: Observable<Usuario[]>;

  constructor(

  ) { 
    super();
    this.editar = new EventEmitter<Usuario>();
    this.borrar = new EventEmitter<Usuario>();

    this._itemsSource = new BehaviorSubject<Usuario[]>([]);
    this.items$ = this._itemsSource.asObservable();

    this.displayedColumns = [ "nombre", "fechaCreacion", "nombreCompleto", "rut", "acciones" ];
  }

  ngOnInit() {
    this.tabla.dataSource = this.items$;
  }

  public onClickVer(usr: Usuario) {
    this.editar.emit(usr);
  }

  public onClickBorrar(usr: Usuario) {
    this.borrar.emit(usr);
  }

  @Input() public set Items(usuarios: Usuario[]) {
    this._itemsSource.next(usuarios);
  }
}
