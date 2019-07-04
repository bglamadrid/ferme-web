import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from } from 'rxjs';
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

  public productos$: Observable<Producto[]>;
  public loading$: Observable<boolean>;
  public busy$: Observable<boolean>;

  @ViewChild("listado") public listado: ProductosListadoComponent;

  constructor(
    protected httpSvc: ProductosHttpService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) { 
    this.loading$ = of(true);
    this.busy$ = of(true);
  }

  ngOnInit() {
    this.cargarProductos();
  }

  protected cargarProductos(): Observable<Producto[]> {
    this.loading$ = of(true);
    this.busy$ = of(true);
    let productos: Observable<Producto[]> = this.httpSvc.listarProductos();
    productos.subscribe((payload: Producto[]) => {
      this.productos$ = of(payload);
    }, err => {
      console.log(err);
      this.productos$ = of([]);
    }, () => {
      this.loading$ = of(false);
      this.busy$ = of(false);
    });
    return from(productos);
  }

  public onClickAgregar(): void {
    this.busy$ = of(true);
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
      () => { this.busy$ = of(false); }
    );
  }

  public onClickEditar(prod: Producto): void {
    this.busy$ = of(true);
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
      () => { this.busy$ = of(false); }
    );
  }

  public onClickBorrar(prod: Producto) {
    this.busy$ = of(true);
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
      () => { this.busy$ = of(false); }
    );
  }

}
