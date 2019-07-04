import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from, Subject } from 'rxjs';
import { Producto } from 'src/modelo/Producto';
import { ProductosListadoComponent } from './listado/listado.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ProductoFormularioComponent, ProductoFormularioDialogData } from './formulario/formulario.component';
import { ProductosHttpService } from 'src/http-services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css'
  ]
})
export class ProductosComponent implements OnInit {

  protected _productos: Producto[];
  protected _productosSource: Subject<Producto[]>;
  public productos$: Observable<Producto[]>;

  protected _loadingSource: Subject<boolean>;
  public loading$: Observable<boolean>;

  protected _busySource: Subject<boolean>;
  public busy$: Observable<boolean>;

  @ViewChild("listado") public listado: ProductosListadoComponent;

  constructor(
    protected httpSvc: ProductosHttpService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) { 
    this._productos = [];
    this._productosSource = new Subject<Producto[]>();
    this.productos$ = this._productosSource.asObservable();
    
    this._loadingSource = new Subject<boolean>();
    this.loading$ = this._loadingSource.asObservable();

    this._busySource = new Subject<boolean>();
    this.busy$ = this._busySource.asObservable();
  }

  ngOnInit() {
    this.cargarProductos();
  }

  protected cargarProductos(): Observable<Producto[]> {
    this._loadingSource.next(true);
    let productos: Observable<Producto[]> = this.httpSvc.listarProductos();
    productos.subscribe((payload: Producto[]) => {
      this._productos = payload;
      this._productosSource.next(payload);
    }, err => {
      console.log(err);
      this._productos = [];
      this._productosSource.next([]);
    }, () => {
      this._loadingSource.next(false);
      this._busySource.next(false);
    });
    return from(productos);
  }

  public onClickAgregar(): void {
    this._busySource.next(true);
    this.dialog.open(ProductoFormularioComponent, {
      width: "40rem",
      height: "28rem"
    }).afterClosed().subscribe(
      (nuevo: Producto) => {
        if (nuevo) {
          this.cargarProductos();
        }
      },
      err => { console.log(err); },
      () => { this._busySource.next(false); }
    );
  }

  public onClickEditar(prod: Producto): void {
    this._busySource.next(true);
    const dialogData: ProductoFormularioDialogData = {
      producto: prod
    };

    this.dialog.open(ProductoFormularioComponent, {
      width: "40rem",
      height: "28rem",
      data: dialogData
    }).afterClosed().subscribe(
      (editado: Producto) => {
        if (editado) {
          this.cargarProductos();
        }
      },
      err => { console.log(err); },
      () => { this._busySource.next(false); }
    );
  }

  public onClickBorrar(prod: Producto) {
    this._busySource.next(true);
    this.httpSvc.borrarProducto(prod.idProducto).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open("Producto '"+prod.nombreProducto+"' eliminado.");
          this.cargarProductos();
        } else {
          this.snackBar.open("Hubo un problema al borrar el producto.");
        }
      },
      err => { 
        this.snackBar.open("Hubo un problema de comunicación con el servidor. Por favor, inténtelo nuevamente.");
        console.log(err); 
      },
      () => { this._busySource.next(false); }
    );
  }

}
