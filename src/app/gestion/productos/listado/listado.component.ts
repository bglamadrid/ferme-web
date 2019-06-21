import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatTable, MatDialog, MatSnackBar } from '@angular/material';
import { Producto } from 'src/models/Producto';
import { ProductoFormularioDialogData, ProductoFormularioComponent } from '../formulario/formulario.component';
import { of, Observable } from 'rxjs';
import { ProductosHttpService } from 'src/http-services/productos.service';

@Component({
  selector: 'app-productos-listado',
  templateUrl: './listado.component.html',
  styleUrls: [
    '../../../../assets/gestion-listados.css',
    './listado.component.css'
  ]
})
export class ProductosListadoComponent  {

  @Output() public editar: EventEmitter<Producto>;
  @Output() public borrar: EventEmitter<Producto>;
  
  @ViewChild("tabla") public tabla: MatTable<Producto>;
  public displayedColumns: string[];

  constructor(
    
  ) { 
    this.displayedColumns = [ "nombre", "codigo", "precio", "stockActual", "stockCritico", "tipo", "acciones" ];
    this.editar = new EventEmitter();
    this.borrar = new EventEmitter();
  }

  public onClickVerProducto(prod: Producto) {
    this.editar.emit(prod);
  }

  public onClickBorrarProducto(prod: Producto) {
    this.borrar.emit(prod);
  }

  @Input() public busy$: Observable<boolean>;
  @Input() public set Productos(productos: Producto[]) {
    this.tabla.dataSource = productos? of(productos) : of([]);
  }

}
