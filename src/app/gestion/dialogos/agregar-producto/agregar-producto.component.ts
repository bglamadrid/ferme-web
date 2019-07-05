import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { FamiliaProducto } from 'src/modelo/FamiliaProducto';
import { Observable, of, Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TipoProducto } from 'src/modelo/TipoProducto';
import { MatDialogRef, MatTable, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Producto } from 'src/modelo/Producto';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GestionSharedHttpService } from 'src/http-services/gestion-shared.service';
import { ProductosHttpService } from 'src/http-services/productos.service';
import { FiltrosProductos } from 'src/app/compartido/filtros-productos/filtros-productos.component';

export interface AgregarProductoDialogData {
  proveedor: number;
}

@Component({
  selector: 'app-venta-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: [
    '../../compartido/formularios.css',
    './agregar-producto.component.css'
  ]
})
export class AgregarProductoVentaComponent implements OnInit {
  
  protected _productosSource: Subject<Producto[]>;
  public productos$: Observable<Producto[]>;

  protected _loadingSource: Subject<boolean>;
  public loading$: Observable<boolean>;

  public hayProductos: boolean;

  @ViewChild("tablaProductos") public tablaProductos: MatTable<Producto>;
  @ViewChild("tablaProductosAgregar") public tablaProductosAgregar: MatTable<Producto>;
  public displayedColumns: string[];

  protected _productosAgregar: Producto[];

  constructor(
    @Inject(MAT_DIALOG_DATA) protected dialogData: AgregarProductoDialogData,
    protected self: MatDialogRef<AgregarProductoVentaComponent>,
    protected sharedSvc: GestionSharedHttpService,
    protected prodSvc: ProductosHttpService,
    protected fb: FormBuilder,
    protected snackBar: MatSnackBar
  ) { 
    this._loadingSource = new Subject<boolean>();
    this.loading$ = this._loadingSource.asObservable();

    this._productosSource = new Subject<Producto[]>();
    this.productos$ = this._productosSource.asObservable();

    this._productosAgregar = [];
    this.displayedColumns = [ "nombre", "precio", "acciones" ];

    this.hayProductos = false;
  }

  ngOnInit() {
    this.tablaProductosAgregar.dataSource = of(this._productosAgregar);
    this.onFiltrosChange({});
  }


  public onFiltrosChange(filtros: FiltrosProductos): void {
    this._loadingSource.next(true);
    let obs: Observable<Producto[]>;

    if (filtros !== {}) {
      obs = this.prodSvc.listarProductosFiltrados(filtros);
    } else {
      obs = this.prodSvc.listarProductos();
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

  public onClickIncluirProducto(prod: Producto): void {
    this._productosAgregar.push(prod);
    this.tablaProductosAgregar.dataSource = of(this._productosAgregar);
    if (this._productosAgregar.length === 1) {
      this.hayProductos = true;
    }
  }

  public onClickRetirarProducto(index: number): void {
    this._productosAgregar.splice(index, 1);
    this.tablaProductosAgregar.dataSource = of(this._productosAgregar);
    if (this._productosAgregar.length === 0) {
      this.hayProductos = false;
    }
  }

  public onClickAceptar(): void {
    this.self.close(this._productosAgregar);
  }

  public onClickCancelar(): void {
    this.self.close([]);
  }

}
