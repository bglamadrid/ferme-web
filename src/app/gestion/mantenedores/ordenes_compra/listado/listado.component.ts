import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatTable } from '@angular/material';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { OrdenCompra } from 'src/modelo/OrdenCompra';
import { ListadoGestionComponent } from 'src/app/gestion/compartido/listado/listado.component';

@Component({
  selector: 'app-ordenes-compra-listado',
  templateUrl: './listado.component.html',
  styleUrls: [
    '../../../compartido/formularios.css',
    './listado.component.css'
  ]
})
export class OrdenesCompraListadoComponent extends ListadoGestionComponent implements OnInit {

  @Output() public editar: EventEmitter<OrdenCompra>;
  @Output() public borrar: EventEmitter<OrdenCompra>;

  @ViewChild("tabla") public tabla: MatTable<OrdenCompra>;
  protected _items: OrdenCompra[];
  protected _itemsSource: BehaviorSubject<OrdenCompra[]>;
  public items$: Observable<OrdenCompra[]>;

  constructor(

  ) { 
    super();
    this.editar = new EventEmitter<OrdenCompra>();
    this.borrar = new EventEmitter<OrdenCompra>();

    this._itemsSource = new BehaviorSubject<OrdenCompra[]>([]);
    this.items$ = this._itemsSource.asObservable();
    
    this.displayedColumns = [ "numero", "fechaSolicitud", "fechaRecepcion", "acciones" ];
  }

  ngOnInit() {
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
