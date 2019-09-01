import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar, MatTable, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MSJ_ERROR_COMM_SRV, REACTIVE_FORMS_ISOLATE, VENTA_TIPO_BOLETA, VENTA_TIPO_FACTURA } from 'src/app/compartido/constantes';
import { AgregarProductoDialogComponent } from 'src/app/gestion/dialogos/agregar-producto/agregar-producto.component';
import { EmpleadosHttpService } from 'src/http-services/empleados-http.service';
import { OrdenesCompraHttpService } from 'src/http-services/ordenes_compra-http.service';
import { ProveedoresHttpService } from 'src/http-services/proveedores-http.service';
import { DetalleOrdenCompra } from 'src/modelo/DetalleOrdenCompra';
import { Empleado } from 'src/modelo/Empleado';
import { OrdenCompra } from 'src/modelo/OrdenCompra';
import { Producto } from 'src/modelo/Producto';
import { Proveedor } from 'src/modelo/Proveedor';
import { AuthService } from 'src/services/auth.service';

export interface OrdenCompraFormularioDialogData {
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
  selector: 'app-orden-compra-formulario-dialog',
  templateUrl: './formulario-orden-compra.component.html',
  styleUrls: [
    '../../../compartido/formularios.css',
    './formulario-orden-compra.component.css'
  ]
})
export class OrdenCompraFormularioDialogComponent implements OnInit {

  protected idOrdenCompra: number;
  protected idEmpleadoUsuario: number;
  protected detallesOrdenCompra: DetalleOrdenCompra[];

  public empleados$: Observable<Empleado[]>;
  public proveedores$: Observable<Proveedor[]>;
  public cargando: boolean;
  public guardando: boolean;

  public ordenCompraForm: FormGroup;
  @ViewChild('tablaDetalles') public tablaDetalles: MatTable<DetalleOrdenCompra>;
  public columnasTabla: string[];

  public fechaSolicitud: string;
  public subtotalOrdenCompra: number;


  constructor(
    @Inject(MAT_DIALOG_DATA) protected dialogData: OrdenCompraFormularioDialogData,
    protected self: MatDialogRef<OrdenCompraFormularioDialogComponent>,
    protected snackBar: MatSnackBar,
    protected fb: FormBuilder,
    protected authSvc: AuthService,
    protected httpSvc: OrdenesCompraHttpService,
    protected empHttpSvc: EmpleadosHttpService,
    protected prvHttpSvc: ProveedoresHttpService,
    protected dialog: MatDialog
  ) {
    this.cargando = true;
    this.guardando = false;

    this.fechaSolicitud = (new Date()).toLocaleDateString();

    this.ordenCompraForm = this.fb.group({
      empleado: [null, Validators.required],
      proveedor: [null, Validators.required]
    });

    this.detallesOrdenCompra = [];
    this.subtotalOrdenCompra = 0;
    this.columnasTabla = [ 'producto', 'precio', 'cantidad', 'acciones' ];

    if (this.dialogData) {
      const oc: OrdenCompra = this.dialogData.ordenCompra;
      if (oc) { this.cargarOrdenCompra(oc); }
    } else {
      this.idEmpleadoUsuario = this.authSvc.sesion.idEmpleado;
      this.cargando = false;
    }
  }

  public get empleado() { return this.ordenCompraForm.get('empleado'); }
  public get proveedor() { return this.ordenCompraForm.get('proveedor'); }

  public get ordenCompra(): OrdenCompra {
    if (this.ordenCompraForm.invalid) {
      return null;
    } else {
      return {
        idOrdenCompra: this.idOrdenCompra ? this.idOrdenCompra : null,
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
    this.proveedores$ = this.prvHttpSvc.listarProveedores();
    this.empleados$ = this.empHttpSvc.listarEmpleados();
  }

  protected cargarOrdenCompra(oc: OrdenCompra): void {
    this.ordenCompraForm.disable(REACTIVE_FORMS_ISOLATE);
    this.cargando = true;

    this.idOrdenCompra = oc.idOrdenCompra;

    if (oc.idEmpleado) {
      this.empleado.setValue(oc.idEmpleado, REACTIVE_FORMS_ISOLATE);
    }

    if (oc.idProveedor) {
      this.proveedor.setValue(oc.idProveedor, REACTIVE_FORMS_ISOLATE);
    }

    this.httpSvc.listarDetalles(oc).pipe(
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
        this.snackBar.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
        this.self.close(null);
      }
    );
  }

  protected guardarOrdenCompra(vnt: OrdenCompra): void {
    this.ordenCompraForm.disable(REACTIVE_FORMS_ISOLATE);
    this.guardando = true;

    this.httpSvc.guardarOrdenCompra(vnt).subscribe(
      (id: number) => {
        if (id) {
          if (vnt.idOrdenCompra) {
            this.snackBar.open('Orden de compra \'' + vnt.idOrdenCompra + '\' actualizada exitosamente.', 'OK', { duration: -1 });
          } else {
            this.snackBar.open('Orden de compra \'' + id + '\' registrada exitosamente.', 'OK', { duration: -1 });
          }
          vnt.idOrdenCompra = id;
          this.self.close(vnt);
        } else {
          this.snackBar.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
          this.guardando = false;
          this.ordenCompraForm.enable(REACTIVE_FORMS_ISOLATE);
        }
      },
      err => {
        this.snackBar.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
        this.ordenCompraForm.enable(REACTIVE_FORMS_ISOLATE);
        this.guardando = false;
      }
    );
  }

  public onClickAgregarProductos(): void {
    this.dialog.open(AgregarProductoDialogComponent, {
      width: '70rem'
    })
      .beforeClosed().subscribe(
        (productos: Producto[]) => {

          if (productos && productos.length > 0) {
            productos.forEach(
              (prod: Producto, i: number) => {
                const dtl: DetalleOrdenCompra = new DetalleOrdenCompra();
                dtl.idProducto = prod.idProducto;
                dtl.nombreProducto = prod.nombreProducto;
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
      this.snackBar.open('Se requieren productos para realizar una orden de compra.', undefined, { duration: 6000 });
    } else if (this.hayProductosSinCantidad) {
      this.snackBar.open('Está solicitando 0 o menos unidades de un producto.', undefined, { duration: 8000 });
    } else {
      this.guardarOrdenCompra(this.ordenCompra);
    }
  }

  public onClickCancelar(): void {
    this.self.close();
  }

  @Input() public set OrdenCompra(emp: OrdenCompra) {
    if (emp) {
      this.cargarOrdenCompra(emp);
    } else {
      this.ordenCompraForm.reset();
    }
  }

}
