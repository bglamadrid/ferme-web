import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTable } from '@angular/material';
import { of, Observable } from 'rxjs';
import { OrdenCompra } from 'src/models/OrdenCompra';

@Component({
  selector: 'app-ordenes-compra-listado',
  templateUrl: './listado.component.html',
  styleUrls: [
    '../../../../assets/gestion-listados.css',
    './listado.component.css'
  ]
})
export class OrdenesCompraListadoComponent {

  @Output() public editar: EventEmitter<OrdenCompra>;
  @Output() public borrar: EventEmitter<OrdenCompra>;

  @ViewChild("tabla") public tabla: MatTable<OrdenCompra>;
  public displayedColumns: string[];

  constructor(

  ) { 
    this.displayedColumns = [ "numero", "fechaSolicitud", "fechaRecepcion", "acciones" ];
    this.editar = new EventEmitter();
    this.borrar = new EventEmitter();
  }

  public onClickVerOrdenCompra(prov: OrdenCompra) {
    this.editar.emit(prov);
  }

  public onClickBorrarOrdenCompra(prov: OrdenCompra) {
    this.borrar.emit(prov);
  }

  @Input() public busy$: Observable<boolean>;
  @Input() public set OrdenesCompra(ordenesCompra: OrdenCompra[]) {
    this.tabla.dataSource = ordenesCompra? of(ordenesCompra) : of([]);
  }
}
