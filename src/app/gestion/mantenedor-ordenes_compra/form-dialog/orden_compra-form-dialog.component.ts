import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { AgregarProductoDialogComponent } from 'src/app/gestion/get-productos-array-dialog/agregar-producto.component';
import { MSJ_ERROR_COMM_SRV, REACTIVE_FORMS_ISOLATE, VENTA_TIPO_BOLETA, VENTA_TIPO_FACTURA } from 'src/app/shared/constantes';
import { CompositeEntityDataService } from 'src/data/composite-entity.data.iservice';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';
import { EntityDataService } from 'src/data/entity.data.iservice';
import { DetalleOrdenCompra } from 'src/models/entities/DetalleOrdenCompra';
import { Empleado } from 'src/models/entities/Empleado';
import { OrdenCompra } from 'src/models/entities/OrdenCompra';
import { Producto } from 'src/models/entities/Producto';
import { Proveedor } from 'src/models/entities/Proveedor';

export interface OrdenCompraFormDialogGestionData {
  ordenCompra: OrdenCompra;
}

export interface TipoOrdenCompra {
  codigo: string;
  descripcion: string;
}

export const TIPOS_VENTA: TipoOrdenCompra[] = [
  { codigo: VENTA_TIPO_BOLETA, descripcion: 'Boleta' },
  { codigo: VENTA_TIPO_FACTURA, descripcion: 'Factura' }
];

@Component({
  selector: 'app-orden_compra-form-dialog-gestion',
  templateUrl: './orden_compra-form-dialog.component.html',
  styleUrls: [
    '../../../../assets/styles/formularios.css',
    './orden_compra-form-dialog.component.css'
  ]
})
export class OrdenCompraFormDialogGestionComponent
  implements OnInit {

  protected idOrdenCompra: number;
  protected idEmpleadoUsuario: number;
  protected detallesOrdenCompra: DetalleOrdenCompra[];

  public empleados$: Observable<Empleado[]>;
  public proveedores$: Observable<Proveedor[]>;
  public cargando: boolean;
  public guardando: boolean;

  public ordenCompraForm: FormGroup;
  @ViewChild('tablaDetalles', { static: true }) public tablaDetalles: MatTable<DetalleOrdenCompra>;
  public columnasTabla: string[];

  public fechaSolicitud: string;
  public subtotalOrdenCompra: number;


  constructor(
    @Inject(MAT_DIALOG_DATA) data: OrdenCompraFormDialogGestionData,
    @Inject(DATA_SERVICE_ALIASES.purchaseOrders) protected dataService: CompositeEntityDataService<OrdenCompra, DetalleOrdenCompra>,
    @Inject(DATA_SERVICE_ALIASES.employees) protected employeeDataService: EntityDataService<Empleado>,
    @Inject(DATA_SERVICE_ALIASES.providers) protected providerDataService: EntityDataService<Proveedor>,
    protected authService: AuthService,
    protected dialog: MatDialogRef<OrdenCompraFormDialogGestionComponent>,
    protected snackBarService: MatSnackBar,
    protected formBuilder: FormBuilder,
    protected dialogService: MatDialog
  ) {
    this.cargando = false;
    this.guardando = false;

    this.fechaSolicitud = (new Date()).toLocaleDateString();

    this.ordenCompraForm = this.formBuilder.group({
      empleado: [null, Validators.required],
      proveedor: [null, Validators.required]
    });

    this.detallesOrdenCompra = [];
    this.subtotalOrdenCompra = 0;
    this.columnasTabla = [ 'producto', 'precio', 'cantidad', 'acciones' ];

    const oc: OrdenCompra = (data?.ordenCompra) ? data.ordenCompra : new OrdenCompra();
    this.cargarOrdenCompra(oc);
  }

  public get empleado() { return this.ordenCompraForm.get('empleado'); }
  public get proveedor() { return this.ordenCompraForm.get('proveedor'); }

  public get ordenCompra(): OrdenCompra {
    if (this.ordenCompraForm.invalid) {
      return null;
    } else {
      return {
        id: this.idOrdenCompra ? this.idOrdenCompra : null,
        idEmpleado: this.empleado.value,
        estadoOrdenCompra: null,
        fechaSolicitudOrdenCompra: this.fechaSolicitud,
        fechaRecepcionOrdenCompra: null,
        detallesOrdenCompra: this.detallesOrdenCompra
      };
    }
  }

  public get esNueva() { return isNaN(this.idOrdenCompra); }

  public get hayProductosSinCantidad() { return this.detallesOrdenCompra.some(dtl => dtl.cantidadProducto <= 0); }

  ngOnInit() {
    this.proveedores$ = this.providerDataService.readAll();
    this.empleados$ = this.employeeDataService.readAll();
  }

  protected cargarOrdenCompra(oc: OrdenCompra): void {
    this.ordenCompraForm.disable(REACTIVE_FORMS_ISOLATE);
    this.cargando = true;

    this.idOrdenCompra = oc.id;

    if (oc.idEmpleado) {
      this.empleado.setValue(oc.idEmpleado, REACTIVE_FORMS_ISOLATE);
    }

    if (oc.idProveedor) {
      this.proveedor.setValue(oc.idProveedor, REACTIVE_FORMS_ISOLATE);
    }

    this.dataService.readDetailsById(oc.id).pipe(
      finalize(() => {
        this.cargando = false;
        this.ordenCompraForm.enable();
      })
    ).subscribe(
      (detalles: DetalleOrdenCompra[]) => {
        this.detallesOrdenCompra = detalles;
        this.tablaDetalles.dataSource = of(detalles);
      },
      err => {
        this.snackBarService.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
        this.dialog.close(null);
      }
    );
  }

  protected guardarOrdenCompra(vnt: OrdenCompra): void {
    this.ordenCompraForm.disable(REACTIVE_FORMS_ISOLATE);
    this.guardando = true;

    this.dataService.create(vnt).subscribe(
      (vnt2: OrdenCompra) => {
        // TODO: make sure vnt2 is not actually vnt
        if (vnt2.id) {
          if (vnt.id) {
            this.snackBarService.open('Orden de compra \'' + vnt.id + '\' actualizada exitosamente.', 'OK', { duration: -1 });
          } else {
            this.snackBarService.open('Orden de compra \'' + vnt2.id + '\' registrada exitosamente.', 'OK', { duration: -1 });
          }
          this.dialog.close(vnt2);
        } else {
          this.snackBarService.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
          this.guardando = false;
          this.ordenCompraForm.enable(REACTIVE_FORMS_ISOLATE);
        }
      },
      err => {
        this.snackBarService.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
        this.ordenCompraForm.enable(REACTIVE_FORMS_ISOLATE);
        this.guardando = false;
      }
    );
  }

  public onClickAgregarProductos(): void {
    this.dialogService.open(AgregarProductoDialogComponent, {
      width: '70rem'
    })
      .beforeClosed().subscribe(
        (productos: Producto[]) => {

          if (productos && productos.length > 0) {
            productos.forEach(
              (prod: Producto, i: number) => {
                const dtl: DetalleOrdenCompra = new DetalleOrdenCompra();
                dtl.idProducto = prod.id;
                dtl.nombreProducto = prod.nombre;
                dtl.precioProducto = prod.precioProducto;
                dtl.cantidadProducto = 1;

                this.detallesOrdenCompra.push(dtl);
                if (i + 1 === productos.length) {
                  this.tablaDetalles.dataSource = of(this.detallesOrdenCompra);
                }
              }
            );
          }
        }
      );
  }

  public onClickIncrementarCantidadProductoDetalle(index: number): void {
    const detalle: DetalleOrdenCompra = this.detallesOrdenCompra[index];
    if (detalle) {
      detalle.cantidadProducto++;
      this.tablaDetalles.dataSource = of(this.detallesOrdenCompra);
    }
  }

  public onClickReducirCantidadProductoDetalle(index: number): void {
    const detalle: DetalleOrdenCompra = this.detallesOrdenCompra[index];
    if (detalle) {
      detalle.cantidadProducto--;
      this.tablaDetalles.dataSource = of(this.detallesOrdenCompra);
    }
  }

  public onClickBorrarDetalle(index: number) {
    this.detallesOrdenCompra.splice(index, 1);
    this.tablaDetalles.dataSource = of(this.detallesOrdenCompra);
  }

  public onClickAceptar(): void {
    if (this.detallesOrdenCompra.length === 0) {
      this.snackBarService.open('Se requieren productos para realizar una orden de compra.', undefined, { duration: 6000 });
    } else if (this.hayProductosSinCantidad) {
      this.snackBarService.open('Está solicitando 0 o menos unidades de un producto.', undefined, { duration: 8000 });
    } else {
      this.guardarOrdenCompra(this.ordenCompra);
    }
  }

  public onClickCancelar(): void {
    this.dialog.close();
  }

  @Input() public set OrdenCompra(emp: OrdenCompra) {
    if (emp) {
      this.cargarOrdenCompra(emp);
    } else {
      this.ordenCompraForm.reset();
    }
  }

}
