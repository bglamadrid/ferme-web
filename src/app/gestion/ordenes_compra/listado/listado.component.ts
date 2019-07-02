import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTable } from '@angular/material';
import { of, Observable, Subject } from 'rxjs';
import { OrdenCompra } from 'src/models/OrdenCompra';
import { ListadoGestionComponent } from '../../common/listado/listado.component';

@Component({
  selector: 'app-ordenes-compra-listado',
  templateUrl: './listado.component.html',
  styleUrls: [
    '../../../../assets/gestion-listados.css',
    './listado.component.css'
  ]
})
export class OrdenesCompraListadoComponent extends ListadoGestionComponent {

  @Output() public editar: EventEmitter<OrdenCompra>;
  @Output() public borrar: EventEmitter<OrdenCompra>;

  @ViewChild("tabla") public tabla: MatTable<OrdenCompra>;
  protected _items: OrdenCompra[];
  protected _itemsSource: Subject<OrdenCompra[]>;
  public items$: Observable<OrdenCompra[]>;

  constructor(

  ) { 
    super();
    this.editar = new EventEmitter<OrdenCompra>();
    this.borrar = new EventEmitter<OrdenCompra>();

    this._itemsSource = new Subject<OrdenCompra[]>();
    this.items$ = this._itemsSource.asObservable();
    
    this.displayedColumns = [ "numero", "fechaSolicitud", "fechaRecepcion", "acciones" ];
    this.tabla.dataSource = this.items$;
  }

  public onClickVer(prov: OrdenCompra) {
    this.editar.emit(prov);
  }

  public onClickBorrar(prov: OrdenCompra) {
    this.borrar.emit(prov);
  }

  @Input() public set Items(ordenesCompra: OrdenCompra[]) {
    this._itemsSource.next(ordenesCompra);
  }
}
