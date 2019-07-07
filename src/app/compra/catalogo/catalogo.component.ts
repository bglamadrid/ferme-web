import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/modelo/Producto';
import { BehaviorSubject, Observable, Subject, from } from 'rxjs';
import { ProductosHttpService } from 'src/http-services/productos.service';
import { MatSnackBar } from '@angular/material';
import { CompraService } from 'src/services/compra.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FiltrosProductos } from 'src/app/compartido/filtros-productos/filtros-productos.component';

@Component({
  selector: 'app-compra-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CompraCatalogoComponent implements OnInit {

  protected _productos: Producto[];
  protected _productosSource: BehaviorSubject<Producto[]>;
  public productos$: Observable<Producto[]>;

  protected _loadingSource: BehaviorSubject<boolean>;
  public cargando$: Observable<boolean>;

  public productoForm: FormGroup;

  constructor(
    protected prodHttpSvc: ProductosHttpService,
    protected fb: FormBuilder,
    protected snackBar: MatSnackBar,
    protected compraSvc: CompraService,
  ) { 
    this._productos = [];   
    this._productosSource = new BehaviorSubject<Producto[]>([]);
    this.productos$ = this._productosSource.asObservable();
    
    this._loadingSource = new BehaviorSubject<boolean>(true);
    this.cargando$ = this._loadingSource.asObservable();

    this.productoForm = this.fb.group({
      familia: [null],
      tipo: [{value: null, disabled: true}],
      nombre: ['']
    });

    this._loadingSource.next(false);
  }

  public get familia() { return this.productoForm.get("familia"); }
  public get tipo() { return this.productoForm.get("tipo"); }
  public get nombre() { return this.productoForm.get("nombre"); }

  ngOnInit() {
    this.onFiltrosChange({});
  }

  public onFiltrosChange(filtros: FiltrosProductos): void {
    this._loadingSource.next(true);
    let obs: Observable<Producto[]>;

    if (filtros !== {}) {
      obs = this.prodHttpSvc.listarProductosFiltrados(filtros);
    } else {
      obs = this.prodHttpSvc.listarProductos();
    }

    obs.subscribe(
      (prods: Producto[]) => { 
        this._productosSource.next(prods);
      },
      err => {
        console.log(err);
        this._productosSource.next([]);
        this.snackBar.open("Hubo un problema al cargar los productos.");
      },
      () => { this._loadingSource.next(false); }
    );
  }

  public onClickAgregarProducto(prod: Producto): void {
    this.compraSvc.agregarProducto(prod);
  }

}
