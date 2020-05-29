import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, Subscription } from 'rxjs';
import { REACTIVE_FORMS_ISOLATE } from 'src/app/shared/constantes';
import { EntityDataService } from 'src/data/entity.data.iservice';
import { SharedHttpDataService } from 'src/data/http/shared.http-data.service';
import { SERVICE_ALIASES } from 'src/data/service-aliases';
import { FamiliaProducto } from 'src/models/entities/FamiliaProducto';
import { Producto } from 'src/models/entities/Producto';
import { TipoProducto } from 'src/models/entities/TipoProducto';

export interface ProductoFormDialogGestionData {
  producto: Producto;
}

@Component({
  selector: 'app-producto-form-dialog-gestion',
  templateUrl: './producto-form-dialog.component.html',
  styleUrls: [
    '../../../../assets/styles/formularios.css',
    './producto-form-dialog.component.css'
  ]
})
export class ProductoFormDialogGestionComponent
  implements OnInit, OnDestroy {

  protected privIdProducto: number;

  public codigoProducto: string;

  public familias$: Observable<FamiliaProducto[]>;
  public tipos$: Observable<TipoProducto[]>;
  public cargando: boolean;

  public productoForm: FormGroup;

  protected privChangeFamiliaSub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) protected dialogData: ProductoFormDialogGestionData,
    protected self: MatDialogRef<ProductoFormDialogGestionComponent>,
    protected snackBar: MatSnackBar,
    protected fb: FormBuilder,
    @Inject(SERVICE_ALIASES.shared) protected sharedSvc: SharedHttpDataService,
    @Inject(SERVICE_ALIASES.products) protected httpSvc: EntityDataService<Producto>
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

    if (prod.id) {
      this.privIdProducto = prod.id;
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

    this.httpSvc.create(prod).subscribe(
      (prod2: Producto) => {
        // TODO: make sure prod2 is not actually prod
        if (prod2.id) {
          if (prod.id) {
            this.snackBar.open('Producto \'' + prod.nombreProducto + '\' actualizado/a exitosamente.');
          } else {
            this.snackBar.open('Producto \'' + prod2.nombreProducto + '\' registrado/a exitosamente.');
          }
          this.self.close(prod2);
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
      id: this.privIdProducto ? this.privIdProducto : null,
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
