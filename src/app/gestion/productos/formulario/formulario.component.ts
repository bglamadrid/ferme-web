import { Component, OnInit, Inject, Input, OnDestroy } from '@angular/core';
import { Producto } from 'src/models/Producto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { GestionSharedHttpService } from '../../../../http-services/gestion-shared.service';
import { TipoProducto } from 'src/models/TipoProducto';
import { ProductosHttpService } from 'src/http-services/productos.service';
import { REACTIVE_FORMS_ISOLATE as NO_EVENT_CHAIN } from 'src/assets/common/Constants';
import { FamiliaProducto } from 'src/models/FamiliaProducto';

export interface ProductoFormularioDialogData {
  producto: Producto;
}

@Component({
  selector: 'app-producto-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['../../../../assets/formularios.css']
})
export class ProductoFormularioComponent implements OnInit, OnDestroy {

  public _codigoProducto: string;

  public familias$: Observable<FamiliaProducto[]>;
  public tipos$: Observable<TipoProducto[]>;
  public showSpinner$: Observable<boolean>;

  public productoForm: FormGroup;

  private _idProducto: number;
  private _changeFamiliaSub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: ProductoFormularioDialogData,
    private self: MatDialogRef<ProductoFormularioComponent>,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private sharedSvc: GestionSharedHttpService,
    private httpSvc: ProductosHttpService
  ) { 
    this.productoForm = this.fb.group({
      nombre: [null, Validators.required],
      familia: [null, Validators.required],
      tipo: [{value: null, disabled: true}, Validators.required],
      precio: [null, Validators.required],
      stockActual: [null, Validators.required],
      stockCritico: [null, Validators.required],
      descripcion: ['']
    });
    this.showSpinner$ = of(true);

    if (this.dialogData) {
      const prod: Producto = this.dialogData.producto;
      if (prod) { this.cargarProducto(prod); }
    } else {
      this._idProducto = null;
      this._codigoProducto =  null;
    }
  }

  public get nombre() { return this.productoForm.get("nombre"); }
  public get familia() { return this.productoForm.get("familia"); }
  public get tipo() { return this.productoForm.get("tipo"); }
  public get precio() { return this.productoForm.get("precio"); }
  public get stockActual() { return this.productoForm.get("stockActual"); }
  public get stockCritico() { return this.productoForm.get("stockCritico"); }
  public get descripcion() { return this.productoForm.get("descripcion"); }

  public get esNuevo() { return !isNaN(this._idProducto); }

  ngOnInit() {
    this.familias$ = this.sharedSvc.familiasProducto();
    this._changeFamiliaSub = this.familia.valueChanges.subscribe(() => { this.onChangeFamilia(); });
  }

  ngOnDestroy() {
    if (this._changeFamiliaSub) { this._changeFamiliaSub.unsubscribe(); }
  }

  private cargarProducto(prod: Producto): void {

    this.productoForm.disable(NO_EVENT_CHAIN);
    this.showSpinner$ = of(true);

    if (prod.idProducto) {
      this._idProducto = prod.idProducto; 
      this._codigoProducto = prod.codigoProducto;
    } else {
      this._idProducto = null; 
      this._codigoProducto =  null;
    }

    this.nombre.setValue(prod.nombreProducto, NO_EVENT_CHAIN);
    this.familia.setValue(prod.idFamiliaProducto, NO_EVENT_CHAIN);
    this.tipo.setValue(prod.idTipoProducto, NO_EVENT_CHAIN);
    this.precio.setValue(prod.precioProducto, NO_EVENT_CHAIN);
    this.stockActual.setValue(prod.stockActualProducto, NO_EVENT_CHAIN);
    this.stockCritico.setValue(String(prod.stockCriticoProducto), NO_EVENT_CHAIN);
    if (prod.descripcionProducto) {
      this.descripcion.setValue(String(prod.descripcionProducto), NO_EVENT_CHAIN);
    }
    this.onChangeFamilia();

    this.showSpinner$ = of(false);
    this.productoForm.enable();
  }

  private guardarProducto(prod: Producto): void {
    this.productoForm.disable(NO_EVENT_CHAIN);
    this.showSpinner$ = of(true);
    
    this.httpSvc.guardarProducto(prod).subscribe(
      (id: number) => {
        if (id) {
          if (prod.idProducto) {
            this.snackBar.open("Producto '"+prod.nombreProducto+"' actualizado/a exitosamente.");
          } else {
            this.snackBar.open("Producto '"+prod.nombreProducto+"' registrado/a exitosamente.");
          }
          prod.idProducto = id;
          this.self.close(prod);
        } else {
          this.snackBar.open("Error al guardar producto.");
        }
      }, err => {
        console.log(err);
        this.snackBar.open("Error al guardar producto.");
        this.showSpinner$ = of(false);
        this.productoForm.enable(NO_EVENT_CHAIN);
      }
    );
  }

  public onChangeFamilia(): void {
    const idTipoProductoSeleccionado: number = this.tipo.value;
    if (this.familia.value) {
      if (this.tipo.disabled) { this.tipo.enable(); }

      const idFamilia: number = Number(this.familia.value);
      if (!isNaN(idFamilia)) {
        this.tipos$ = this.sharedSvc.tiposProductoByFamilia(idFamilia);
        if (idTipoProductoSeleccionado) {
          this.tipos$.subscribe(
            (tipos: TipoProducto[]) => {
              if (!(tipos && tipos.length > 0 && tipos.find(tp => tp.idTipoProducto === idTipoProductoSeleccionado))) {
                this.tipo.reset();
              }
            }, 
            err => { 
              console.log(err);
              this.tipo.reset();
            }
          );
        }
        return;
      }
    }

    this.tipos$ = of([]);
    this.tipo.reset();
  }

  public onClickAceptar(): void {
    const nuevo: Producto = {
      idProducto: this._idProducto? this._idProducto : null,
      idTipoProducto: this.tipo.value,
      nombreProducto: this.nombre.value,
      precioProducto: this.precio.value,
      stockActualProducto: this.stockActual.value,
      stockCriticoProducto: this.stockCritico.value,
      descripcionProducto: this.descripcion.value? this.descripcion.value : null,
      codigoProducto: undefined,
      nombreTipoProducto: undefined
    };

    this.guardarProducto(nuevo);
  }

  public onClickCancelar(): void {
    this.self.close();
  }

  @Input() public set Producto(prod: Producto) {
    if (prod) {
      this.cargarProducto(prod);
    } else {
      this.productoForm.reset();
    }
  }

}
