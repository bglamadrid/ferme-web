import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { FamiliaProducto } from 'src/models/FamiliaProducto';
import { Observable, of, Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TipoProducto } from 'src/models/TipoProducto';
import { MatDialogRef, MatTable, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Producto } from 'src/models/Producto';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GestionSharedHttpService } from 'src/http-services/gestion-shared.service';
import { ProductosHttpService } from 'src/http-services/productos.service';

export interface AgregarProductoDialogData {
  proveedor: number;
}

@Component({
  selector: 'app-venta-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: [
    '../../../../assets/formularios.css',
    './agregar-producto.component.css'
  ]
})
export class AgregarProductoVentaComponent implements OnInit, OnDestroy {

  
  private _idProveedor: number;

  public _filtro: string;
  
  public familias$: Observable<FamiliaProducto[]>;
  public tipos$: Observable<TipoProducto[]>;
  public productos$: Observable<Producto[]>;
  public showSpinner$: Observable<boolean>;
  public hayProductos$: Observable<boolean>;
  

  public productoForm: FormGroup;
  @ViewChild("tablaProductos") public tablaProductos: MatTable<Producto>;
  @ViewChild("tablaProductosAgregar") public tablaProductosAgregar: MatTable<Producto>;
  public displayedColumns: string[];

  private nombreBuscar$: Subject<string>;

  private _productosAgregar: Producto[];
  private _changeFiltrosSub: Subscription;
  private _changeTipoSub: Subscription;
  private _changeNombreSub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: AgregarProductoDialogData,
    private self: MatDialogRef<AgregarProductoVentaComponent>,
    private sharedSvc: GestionSharedHttpService,
    private prodSvc: ProductosHttpService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { 
    this._productosAgregar = [];
    this.displayedColumns = [ "nombre", "precio", "acciones" ];

    this.nombreBuscar$ = new Subject<string>();

    this.showSpinner$ = of(true);
    this.familias$ = of([]);
    this.tipos$ = of([]);
    this.productos$ = of([]);
    this.hayProductos$ = of(false);

    this.productoForm = this.fb.group({
      familia: [null],
      tipo: [{value: null, disabled: true}],
      nombre: ['']
    });
  }

  public get familia() { return this.productoForm.get("familia"); }
  public get tipo() { return this.productoForm.get("tipo"); }
  public get nombre() { return this.productoForm.get("nombre"); }

  ngOnInit() {
    this.tablaProductosAgregar.dataSource = of(this._productosAgregar);

    this.familias$ = this.sharedSvc.familiasProducto();
    this.productos$ = this.prodSvc.listarProductos();

    this._changeFiltrosSub = this.familia.valueChanges.subscribe(() => { this.onChangeFamilia(); });
    this._changeTipoSub = this.tipo.valueChanges.subscribe(() => { this.buscar(); });
    this._changeNombreSub = this.nombre.valueChanges.pipe( 
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => { this.buscar(); });
  }

  ngOnDestroy() {
    if (this._changeFiltrosSub) { this._changeFiltrosSub.unsubscribe(); }
    if (this._changeTipoSub) { this._changeTipoSub.unsubscribe(); }
    if (this._changeNombreSub) { this._changeTipoSub.unsubscribe(); }
  }

  private resetTipo(): void {
    this.tipos$ = of([]);
    this.tipo.reset();
    this.tipo.disable();
  }

  private buscar(): void {
    this.productoForm.updateValueAndValidity();
    let filtros = {};
    
    if (this.nombre.value) {
      filtros["nombre"] = this.nombre.value;
    }
    if (this.tipo.value) {
      filtros["tipo"] = this.tipo.value;
    }
    if (this.familia.value) {
      filtros["familia"] = this.familia.value;
    }
  
    this.productos$ = of([]);
    this.prodSvc.listarProductosByFilters(filtros).subscribe(
      (prods: Producto[]) => {
        this.productos$ = of(prods);
      },
      err => {
        console.log(err);
        this.snackBar.open("Hubo un problema al cargar los productos.");
      }
    );
  }

  public onChangeFamilia(): void {
    const idTipoProductoSeleccionado: number = this.tipo.value;
    if (this.familia.value) {
      if (this.tipo.enabled) { this.tipo.disable(); }

      const idFamilia: number = Number(this.familia.value);
      if (!isNaN(idFamilia)) {
        this.buscar();
        this.sharedSvc.tiposProductoByFamilia(idFamilia).subscribe( 
          (tipos: TipoProducto[]) => { 
            if (tipos && tipos.length > 0) {
              this.tipos$ = of(tipos);
              this.tipo.enable(); 
              if (idTipoProductoSeleccionado && !tipos.some(tp => tp.idTipoProducto === idTipoProductoSeleccionado)) { 
                this.tipo.reset();
              }
            } else {
              this.resetTipo();
            }
          }, 
          err => { 
            console.log(err);
            this.tipo.reset();
            this.tipo.disable();
          }
        );
        return;
      }
    }

    this.resetTipo();
  }

  public onClickLimpiarFamilia(ev: any): void {
    this.familia.reset();
    ev.stopPropagation();
  }

  public onClickLimpiarTipo(ev: any): void {
    this.tipo.reset();
    ev.stopPropagation();
  }

  public onClickIncluirProducto(prod: Producto): void {
    this._productosAgregar.push(prod);
    this.tablaProductosAgregar.dataSource = of(this._productosAgregar);
    if (this._productosAgregar.length === 1) {
      this.hayProductos$ = of(true);
    }
  }

  public onClickRetirarProducto(index: number): void {
    this._productosAgregar.splice(index, 1);
    this.tablaProductosAgregar.dataSource = of(this._productosAgregar);
    if (this._productosAgregar.length === 0) {
      this.hayProductos$ = of(false);
    }
  }

  public onClickAceptar(): void {
    this.self.close(this._productosAgregar);
  }

  public onClickCancelar(): void {
    this.self.close([]);
  }

}
