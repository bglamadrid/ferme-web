import { Component, OnInit, Inject, Input, OnDestroy } from '@angular/core';
import { Producto } from 'src/modelo/Producto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { TipoProducto } from 'src/modelo/TipoProducto';
import { ProductosHttpService } from 'src/http-services/productos-http.service';
import { REACTIVE_FORMS_ISOLATE } from 'src/app/compartido/constantes';
import { FamiliaProducto } from 'src/modelo/FamiliaProducto';
import { GestionSharedHttpService } from 'src/http-services/gestion-shared-http.service';

export interface ProductoFormularioDialogData {
  producto: Producto;
}

@Component({
  selector: 'app-producto-formulario-dialog',
  templateUrl: './formulario-producto.component.html',
  styleUrls: [
    '../../../compartido/formularios.css',
    './formulario-producto.component.css'
  ]
})
export class ProductoFormularioDialogComponent implements OnInit, OnDestroy {

  protected privIdProducto: number;

  public codigoProducto: string;

  public familias$: Observable<FamiliaProducto[]>;
  public tipos$: Observable<TipoProducto[]>;
  public cargando: boolean;

  public productoForm: FormGroup;

  protected privChangeFamiliaSub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) protected dialogData: ProductoFormularioDialogData,
    protected self: MatDialogRef<ProductoFormularioDialogComponent>,
    protected snackBar: MatSnackBar,
    protected fb: FormBuilder,
    protected sharedSvc: GestionSharedHttpService,
    protected httpSvc: ProductosHttpService
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
    this.cargando = true;

    if (this.dialogData) {
      const prod: Producto = this.dialogData.producto;
      if (prod) { this.cargarProducto(prod); }
    } else {
      this.privIdProducto = null;
      this.codigoProducto =  null;
    }
  }

  public get nombre() { return this.productoForm.get('nombre'); }
  public get familia() { return this.productoForm.get('familia'); }
  public get tipo() { return this.productoForm.get('tipo'); }
  public get precio() { return this.productoForm.get('precio'); }
  public get stockActual() { return this.productoForm.get('stockActual'); }
  public get stockCritico() { return this.productoForm.get('stockCritico'); }
  public get descripcion() { return this.productoForm.get('descripcion'); }

  public get esNuevo() { return isNaN(this.privIdProducto); }

  ngOnInit() {
    this.familias$ = this.sharedSvc.familiasProducto();
    this.privChangeFamiliaSub = this.familia.valueChanges.subscribe(() => { this.onChangeFamilia(); });
  }

  ngOnDestroy() {
    if (this.privChangeFamiliaSub) { this.privChangeFamiliaSub.unsubscribe(); }
  }

  protected cargarProducto(prod: Producto): void {
    this.productoForm.disable(REACTIVE_FORMS_ISOLATE);
    this.cargando = true;

    if (prod.idProducto) {
      this.privIdProducto = prod.idProducto;
      this.codigoProducto = prod.codigoProducto;
    } else {
      this.privIdProducto = null;
      this.codigoProducto =  null;
    }

    this.nombre.setValue(prod.nombreProducto, REACTIVE_FORMS_ISOLATE);
    this.familia.setValue(prod.idFamiliaProducto, REACTIVE_FORMS_ISOLATE);
    this.tipo.setValue(prod.idTipoProducto, REACTIVE_FORMS_ISOLATE);
    this.precio.setValue(prod.precioProducto, REACTIVE_FORMS_ISOLATE);
    this.stockActual.setValue(prod.stockActualProducto, REACTIVE_FORMS_ISOLATE);
    this.stockCritico.setValue(String(prod.stockCriticoProducto), REACTIVE_FORMS_ISOLATE);
    if (prod.descripcionProducto) {
      this.descripcion.setValue(prod.descripcionProducto, REACTIVE_FORMS_ISOLATE);
    }
    this.onChangeFamilia();

    this.cargando = false;
    this.productoForm.enable();
  }

  protected guardarProducto(prod: Producto): void {
    this.productoForm.disable(REACTIVE_FORMS_ISOLATE);
    this.cargando = true;

    this.httpSvc.guardarProducto(prod).subscribe(
      (id: number) => {
        if (id) {
          if (prod.idProducto) {
            this.snackBar.open('Producto \'' + prod.nombreProducto + '\' actualizado/a exitosamente.');
          } else {
            this.snackBar.open('Producto \'' + prod.nombreProducto + '\' registrado/a exitosamente.');
          }
          prod.idProducto = id;
          this.self.close(prod);
        } else {
          this.snackBar.open('Error al guardar producto.');
        }
      }, err => {
        this.snackBar.open('Error al guardar producto.');
        this.cargando = false;
        this.productoForm.enable(REACTIVE_FORMS_ISOLATE);
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
      idProducto: this.privIdProducto ? this.privIdProducto : null,
      idTipoProducto: this.tipo.value,
      nombreProducto: this.nombre.value,
      precioProducto: this.precio.value,
      stockActualProducto: this.stockActual.value,
      stockCriticoProducto: this.stockCritico.value,
      descripcionProducto: this.descripcion.value ? this.descripcion.value : null,
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
