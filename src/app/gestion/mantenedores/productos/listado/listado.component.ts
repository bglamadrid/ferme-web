import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatTable, MatDialog, MatSnackBar } from '@angular/material';
import { Producto } from 'src/modelo/Producto';
import { ProductoFormularioDialogData, ProductoFormularioComponent } from '../formulario/formulario.component';
import { of, Observable, Subject } from 'rxjs';
import { ProductosHttpService } from 'src/http-services/productos.service';
import { ListadoGestionComponent } from 'src/app/gestion/compartido/listado/listado.component';

@Component({
  selector: 'app-productos-listado',
  templateUrl: './listado.component.html',
  styleUrls: [
    '../../../compartido/formularios.css',
    './listado.component.css'
  ]
})
export class ProductosListadoComponent extends ListadoGestionComponent {

  @Output() public editar: EventEmitter<Producto>;
  @Output() public borrar: EventEmitter<Producto>;
  
  @ViewChild("tabla") public tabla: MatTable<Producto>;
  protected _items: Producto[];
  protected _itemsSource: Subject<Producto[]>;
  public items$: Observable<Producto[]>;

  constructor(
    
  ) { 
    super();
    this.editar = new EventEmitter<Producto>();
    this.borrar = new EventEmitter<Producto>();

    this._itemsSource = new Subject<Producto[]>();
    this.items$ = this._itemsSource.asObservable();

    this.displayedColumns = [ "nombre", "codigo", "precio", "stockActual", "stockCritico", "tipo", "acciones" ];
    this.tabla.dataSource = this.items$;
  }

  public onClickVer(prod: Producto) {
    this.editar.emit(prod);
  }

  public onClickBorrar(prod: Producto) {
    this.borrar.emit(prod);
  }

  @Input() public set Items(productos: Producto[]) {
    this._itemsSource.next(productos);
  }

}
