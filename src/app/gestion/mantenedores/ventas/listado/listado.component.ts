import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatTable } from '@angular/material';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { Venta } from 'src/modelo/Venta';
import { ListadoGestionComponent } from 'src/app/gestion/compartido/listado/listado.component';

@Component({
  selector: 'app-ventas-listado',
  templateUrl: './listado.component.html',
  styleUrls: [
    '../../../compartido/formularios.css',
    './listado.component.css'
  ]
})
export class VentasListadoComponent extends ListadoGestionComponent implements OnInit {

  @Output() public editar: EventEmitter<Venta>;
  @Output() public borrar: EventEmitter<Venta>;

  @ViewChild("tabla") public tabla: MatTable<Venta>;
  protected _items: Venta[];
  protected _itemsSource: BehaviorSubject<Venta[]>;
  public items$: Observable<Venta[]>;

  constructor(

  ) { 
    super();
    this.editar = new EventEmitter<Venta>();
    this.borrar = new EventEmitter<Venta>();

    this._itemsSource = new BehaviorSubject<Venta[]>([]);
    this.items$ = this._itemsSource.asObservable();

    this.displayedColumns = [ "numero", "fecha", "acciones" ];
  }

  ngOnInit() {
    this.tabla.dataSource = this.items$;
  }

  public onClickVer(vnt: Venta) {
    this.editar.emit(vnt);
  }

  public onClickBorrar(vnt: Venta) {
    this.borrar.emit(vnt);
  }

  @Input() public set Items(ventas: Venta[]) {
    this._itemsSource.next(ventas);
  }
}