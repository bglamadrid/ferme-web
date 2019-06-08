import { Component, OnInit, Inject, Input } from '@angular/core';
import { Producto } from 'src/models/Producto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { GestionSharedService } from '../../gestion-shared.service';
import { TipoProducto } from 'src/models/TipoProducto';
import { ProductosHttpService } from 'src/http-services/productos.service';
import { REACTIVE_FORMS_ISOLATE as NO_EVENT_CHAIN } from 'src/assets/common/Constants';

export interface ProductoFormularioDialogData {
  producto: Producto;
}

@Component({
  selector: 'app-productos-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['../../gestion-formularios.css']
})
export class ProductoFormularioComponent implements OnInit {

  private _idProducto: number;
  public _codigoProducto: string;

  public tipos$: Observable<TipoProducto[]>;
  public showSpinner$: Observable<boolean>;

  public productoForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: ProductoFormularioDialogData,
    private self: MatDialogRef<ProductoFormularioComponent>,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private sharedSvc: GestionSharedService,
    private httpSvc: ProductosHttpService
  ) { 
    this.productoForm = this.fb.group({
      nombre: [null, Validators.required],
      tipo: [null, Validators.required],
      precio: [null, Validators.required],
      stockActual: [null, Validators.required],
      stockCritico: [null, Validators.required],
      descripcion: ['']
    });
    this.showSpinner$ = of(true);

    if (this.dialogData) {
      const prod: Producto = this.dialogData.producto;
      if (prod) { this.cargarProducto(prod); }
    }
  }

  public get nombre() { return this.productoForm.get("nombre"); }
  public get tipo() { return this.productoForm.get("tipo"); }
  public get precio() { return this.productoForm.get("precio"); }
  public get stockActual() { return this.productoForm.get("stockActual"); }
  public get stockCritico() { return this.productoForm.get("stockCritico"); }
  public get descripcion() { return this.productoForm.get("descripcion"); }

  ngOnInit() {
    this.tipos$ = this.sharedSvc.tiposProducto();
  }

  private cargarProducto(prod: Producto): void {

    this.productoForm.disable(NO_EVENT_CHAIN);
    this.showSpinner$ = of(true);

    if (prod.idProducto) {
      this._idProducto = prod.idProducto; 
      this._codigoProducto = prod.codigoProducto;
    }

    this.nombre.setValue(prod.nombreProducto, NO_EVENT_CHAIN);
    this.tipo.setValue(prod.idTipoProducto, NO_EVENT_CHAIN);
    this.precio.setValue(prod.precioProducto, NO_EVENT_CHAIN);
    this.stockActual.setValue(prod.stockActualProducto, NO_EVENT_CHAIN);
    this.stockCritico.setValue(String(prod.stockCriticoProducto), NO_EVENT_CHAIN);
    this.descripcion.setValue(String(prod.descripcionProducto), NO_EVENT_CHAIN);

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

  public onClickAceptar(): void {
    let nuevo: Producto = {
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
