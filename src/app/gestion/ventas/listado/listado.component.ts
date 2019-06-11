import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTable } from '@angular/material';
import { of, Observable } from 'rxjs';
import { Venta } from 'src/models/Venta';

@Component({
  selector: 'app-ventas-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class VentasListadoComponent {

  @Output() public editar: EventEmitter<Venta>;
  @Output() public borrar: EventEmitter<Venta>;

  @ViewChild("tabla") public tabla: MatTable<Venta>;
  public displayedColumns: string[];

  constructor(

  ) { 
    this.displayedColumns = [ "numero", "fecha", "acciones" ];
    this.editar = new EventEmitter();
    this.borrar = new EventEmitter();
  }

  public onClickVerVenta(prov: Venta) {
    this.editar.emit(prov);
  }

  public onClickBorrarVenta(prov: Venta) {
    this.editar.emit(prov);
  }

  @Input() public busy$: Observable<boolean>;
  @Input() public set Ventas(ventas: Venta[]) {
    this.tabla.dataSource = ventas? of(ventas) : of([]);
  }
}
