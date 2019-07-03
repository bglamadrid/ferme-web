import { Output, ViewChild, Input, EventEmitter } from '@angular/core';
import { MatTable } from '@angular/material';
import { Subject, Observable } from 'rxjs';

export abstract class ListadoGestionComponent {

  @Output() public editar: EventEmitter<any>;
  @Output() public borrar: EventEmitter<any>;

  protected _busySource: Subject<boolean>;
  public busy$: Observable<boolean>;

  @ViewChild("tabla") public tabla: MatTable<any>;
  protected _items: any[];
  protected _itemsSource: Subject<any[]>;
  public items$: Observable<any[]>;
  public displayedColumns: string[];

  constructor(

  ) { 
    this._items = [];
    this._busySource = new Subject();
    this.busy$ = this._busySource.asObservable();
  }

  public onClickVer(prov: any) {
    if (this.editar) {
      this.editar.emit(prov);
    }
  }

  public onClickBorrar(prov: any) {
    if (this.borrar) {
      this.borrar.emit(prov);
    }
  }

  @Input() public set Busy(state: boolean) {
    if (this._busySource) {
      this._busySource.next(state);
    }
  }

  @Input() public set Items(items: any[]) {
    this._items = items;
    if (this._itemsSource) {
      this._itemsSource.next(items);
    }
  }

}
