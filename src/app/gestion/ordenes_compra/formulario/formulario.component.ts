import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTable, MatDialog } from '@angular/material';
import { Observable, of, Subscription } from 'rxjs';
import { OrdenCompra } from 'src/models/OrdenCompra';
import { OrdenesCompraHttpService } from 'src/http-services/ordenes_compra.service';
import { REACTIVE_FORMS_ISOLATE as NO_EVENT_CHAIN, VENTA_TIPO_BOLETA, VENTA_TIPO_FACTURA, USUARIO_PERSONA_ID } from 'src/assets/common/Constants';
import { DetalleOrdenCompra } from 'src/models/DetalleOrdenCompra';
import { Empleado } from 'src/models/Empleado';
import { EmpleadosHttpService } from 'src/http-services/empleados.service';
import { Producto } from 'src/models/Producto';
import { AgregarProductoVentaComponent } from '../../common/agregar-producto/agregar-producto.component';
import { Proveedor } from "src/models/Proveedor";
import { ProveedoresHttpService } from "src/http-services/proveedores.service";

export interface OrdenCompraFormularioDialogData {
  ordenCompra: OrdenCompra;
}

export interface TipoOrdenCompra {
  codigo: string;
  descripcion: string;
}

export const TIPOS_VENTA: TipoOrdenCompra[] = [
  { codigo: VENTA_TIPO_BOLETA, descripcion: "Boleta" },
  { codigo: VENTA_TIPO_FACTURA, descripcion: "Factura" }
]

@Component({
  selector: 'app-orden-compra-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: [
    '../../../../assets/formularios.css',
    './formulario.component.css'
  ]
})
export class OrdenCompraFormularioComponent implements OnInit {

  private _idOrdenCompra: number;
  private _idEmpleadoUsuario: number;

  public empleados$: Observable<Empleado[]>;
  public proveedores$: Observable<Proveedor[]>;
  public showSpinner$: Observable<boolean>;

  public ordenCompraForm: FormGroup;
  @ViewChild("tablaDetalles") public tablaDetalles: MatTable<DetalleOrdenCompra>;
  public displayedColumns: string[];

  public fechaSolicitud: string;
  public detallesOrdenCompra$: Observable<DetalleOrdenCompra[]>;
  public subtotalOrdenCompra: number;

  private _detallesOrdenCompra: DetalleOrdenCompra[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: OrdenCompraFormularioDialogData,
    private self: MatDialogRef<OrdenCompraFormularioComponent>,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private httpSvc: OrdenesCompraHttpService,
    private empHttpSvc: EmpleadosHttpService,
    private prvHttpSvc: ProveedoresHttpService,
    private dialog: MatDialog
  ) { 
    this.showSpinner$ = of(true);

    this.fechaSolicitud = (new Date()).toLocaleDateString();

    this.ordenCompraForm = this.fb.group({
      empleado: [null, Validators.required],
      proveedor: [null, Validators.required]
    });

    this._detallesOrdenCompra = [];
    this.detallesOrdenCompra$ = of([]);
    this.subtotalOrdenCompra = 0;
    this.displayedColumns = [ "producto", "precio", "cantidad", "acciones" ];

    if (this.dialogData) {
      const oc: OrdenCompra = this.dialogData.ordenCompra;
      if (oc) { this.cargarOrdenCompra(oc); }
    } else {
      this.empHttpSvc.obtenerEmpleadoIdDesdePersonaId(USUARIO_PERSONA_ID).subscribe(

      )
    }
  }

  public get empleado() { return this.ordenCompraForm.get("empleado"); }
  public get proveedor() { return this.ordenCompraForm.get("proveedor"); }

  public get esNueva() { return isNaN(this._idOrdenCompra); }

  public get hayProductosSinCantidad() { return this._detallesOrdenCompra.some(dtl => dtl.cantidadProducto<=0); }

  ngOnInit() {
    this.prvHttpSvc.listarProveedores().subscribe(prvs => { this.proveedores$ = of(prvs); });
    this.empHttpSvc.listarEmpleados().subscribe(emps => { this.empleados$ = of(emps); });
  }

  private cargarOrdenCompra(vnt: OrdenCompra): void {

    this.ordenCompraForm.disable(NO_EVENT_CHAIN);
    this.showSpinner$ = of(true);
    console.log(vnt);
    

    this._idOrdenCompra = vnt.idOrdenCompra;

    if (vnt.idEmpleado) {
      this.empleado.setValue(vnt.idEmpleado, NO_EVENT_CHAIN);
    }

    this.httpSvc.listarDetalles(vnt).subscribe(
      (detalles: DetalleOrdenCompra[]) => {
        this._detallesOrdenCompra = detalles;
        this.detallesOrdenCompra$ = of(detalles);
      }, 
      err => {
        console.log(err);
        this.snackBar.open("Hubo un problema cargando los detalles de la orden-compra.");
      },
      () => {
        this.showSpinner$ = of(false);
        this.ordenCompraForm.enable();
      }
    )
  }

  private guardarOrdenCompra(vnt: OrdenCompra): void {
    this.ordenCompraForm.disable(NO_EVENT_CHAIN);
    this.showSpinner$ = of(true);
    
    this.httpSvc.guardarOrdenCompra(vnt).subscribe(
      (id: number) => {
        if (id) {
          if (vnt.idOrdenCompra) {
            this.snackBar.open("OrdenCompra N° '"+vnt.idOrdenCompra+"' actualizada exitosamente.");
          } else {
            this.snackBar.open("OrdenCompra N° '"+id+"' registrada exitosamente.");
          }
          vnt.idOrdenCompra = id;
          this.self.close(vnt);
        } else {
          this.snackBar.open("Error al guardar orden-compra.");
        }
      }, err => {
        console.log(err);
        this.snackBar.open("Error al guardar orden-compra.");
        this.showSpinner$ = of(false);
        this.ordenCompraForm.enable(NO_EVENT_CHAIN);
      }
    );
  }

  public onClickAgregarProductos(): void {
    this.dialog.open(AgregarProductoVentaComponent, { 
      width: "37rem", 
      height: "26rem"
    })
      .beforeClosed().subscribe(
        (productos: Producto[]) => {
          console.log(productos);
          
          if (productos && productos.length > 0) {
            productos.forEach(
              (prod: Producto, i: number) => {
                let dtl: DetalleOrdenCompra = new DetalleOrdenCompra();
                dtl.idProducto = prod.idProducto;
                dtl.nombreProducto = prod.nombreProducto;
                dtl.precioProducto = prod.precioProducto;
                dtl.cantidadProducto = 1;
                console.log(dtl);
                
                this._detallesOrdenCompra.push(dtl);
                if (i+1 === productos.length) {
                  console.log(this._detallesOrdenCompra);
                  this.detallesOrdenCompra$ = of(this._detallesOrdenCompra);
                }
              }
            );
          }
        }
      );
  }

  public onClickIncrementarCantidadProductoDetalle(index: number): void {
    const detalle: DetalleOrdenCompra = this._detallesOrdenCompra[index];
    if (detalle) {
      detalle.cantidadProducto++;
      this.detallesOrdenCompra$ = of(this._detallesOrdenCompra);
    }
  }

  public onClickReducirCantidadProductoDetalle(index: number): void {
    const detalle: DetalleOrdenCompra = this._detallesOrdenCompra[index];
    if (detalle) {
      detalle.cantidadProducto--;
      this.detallesOrdenCompra$ = of(this._detallesOrdenCompra);
    }
  }

  public onClickBorrarDetalle(index: number) {
    this._detallesOrdenCompra.splice(index, 1);
    this.detallesOrdenCompra$ = of(this._detallesOrdenCompra);
  }

  public onClickAceptar(): void {
    if (this._detallesOrdenCompra.length === 0) {
      this.snackBar.open("Se requieren productos para realizar una orden de compra.", undefined, { duration: 6000 });
    } else if (this.hayProductosSinCantidad) {
      this.snackBar.open("Está solicitando 0 o menos unidades de un producto. Corríjalo e intente nuevamente.", undefined, { duration: 8000 });
    } else {
      let nuevo: OrdenCompra = {
        idOrdenCompra: this._idOrdenCompra? this._idOrdenCompra : null,
        idEmpleado: this.empleado.value,
        estadoOrdenCompra: null,
        fechaSolicitudOrdenCompra: this.fechaSolicitud,
        fechaRecepcionOrdenCompra: null,
        detallesOrdenCompra: this._detallesOrdenCompra
      };

      this.guardarOrdenCompra(nuevo);
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
