import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTable } from '@angular/material';
import { of, Observable, Subject } from 'rxjs';
import { Proveedor } from 'src/models/Proveedor';
import { ListadoGestionComponent } from '../../common/listado/listado.component';

@Component({
  selector: 'app-proveedores-listado',
  templateUrl: './listado.component.html',
  styleUrls: [
    '../../../../assets/gestion-listados.css',
    './listado.component.css'
  ]
})
export class ProveedoresListadoComponent extends ListadoGestionComponent {

  @Output() public editar: EventEmitter<Proveedor>;
  @Output() public borrar: EventEmitter<Proveedor>;

  @ViewChild("tabla") public tabla: MatTable<Proveedor>;
  protected _items: Proveedor[];
  protected _itemsSource: Subject<Proveedor[]>;
  public items$: Observable<Proveedor[]>;

  constructor(

  ) { 
    super();
    this.editar = new EventEmitter<Proveedor>();
    this.borrar = new EventEmitter<Proveedor>();

    this._itemsSource = new Subject<Proveedor[]>();
    this.items$ = this._itemsSource.asObservable();

    this.displayedColumns = [ "nombre", "rut", "acciones" ];
    this.tabla.dataSource = this.items$;
  }

  public onClickVer(prov: Proveedor) {
    this.editar.emit(prov);
  }

  public onClickBorrar(prov: Proveedor) {
    this.borrar.emit(prov);
  }

  @Input() public set Items(proveedores: Proveedor[]) {
    this._itemsSource.next(proveedores);
  }
}
