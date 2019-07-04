import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTable, MatDialog } from '@angular/material';
import { Observable, of, Subscription, Subject } from 'rxjs';
import { Venta } from 'src/modelo/Venta';
import { VentasHttpService } from 'src/http-services/ventas.service';
import { REACTIVE_FORMS_ISOLATE as NO_EVENT_CHAIN, VENTA_TIPO_BOLETA, VENTA_TIPO_FACTURA } from 'src/app/compartido/constantes';
import { DetalleVenta } from 'src/modelo/DetalleVenta';
import { Empleado } from 'src/modelo/Empleado';
import { Cliente } from 'src/modelo/Cliente';
import { EmpleadosHttpService } from 'src/http-services/empleados.service';
import { ClientesHttpService } from 'src/http-services/clientes.service';
import { Producto } from 'src/modelo/Producto';
import { AgregarProductoVentaComponent } from 'src/app/gestion/dialogos/agregar-producto/agregar-producto.component';

export interface VentaFormularioDialogData {
  venta: Venta;
}

export interface TipoVenta {
  codigo: string;
  descripcion: string;
}

export const TIPOS_VENTA: TipoVenta[] = [
  { codigo: VENTA_TIPO_BOLETA, descripcion: "Boleta" },
  { codigo: VENTA_TIPO_FACTURA, descripcion: "Factura" }
]

@Component({
  selector: 'app-venta-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: [
    '../../../compartido/formularios.css',
    './formulario.component.css'
  ]
})
export class VentaFormularioComponent implements OnInit {

  private _idVenta: number;


  public tipos$: Observable<TipoVenta[]>;
  public empleados$: Observable<Empleado[]>;
  public clientes$: Observable<Cliente[]>;
  private showSpinnerSource: Subject<boolean>;
  public showSpinner$: Observable<boolean>;

  public ventaForm: FormGroup;
  @ViewChild("tablaDetalles") public tablaDetalles: MatTable<DetalleVenta>;
  public displayedColumns: string[];

  public fechaVenta: string;
  public detallesVenta$: Observable<DetalleVenta[]>;
  public subtotalVenta: number;

  private _detallesVenta: DetalleVenta[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: VentaFormularioDialogData,
    private self: MatDialogRef<VentaFormularioComponent>,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private httpSvc: VentasHttpService,
    private empHttpSvc: EmpleadosHttpService,
    private clHttpSvc: ClientesHttpService,
    private dialog: MatDialog
  ) { 
    this.showSpinnerSource = new Subject<boolean>();
    this.showSpinner$ = this.showSpinnerSource.asObservable();
    this.showSpinnerSource.next(true);
    this.tipos$ = of(TIPOS_VENTA);

    this.fechaVenta = (new Date()).toLocaleDateString();
    this._detallesVenta = [];
    this.detallesVenta$ = of([]);
    this.subtotalVenta = 0;
    this.displayedColumns = [ "producto", "precio", "cantidad", "acciones" ];

    this.ventaForm = this.fb.group({
      tipo: [null, Validators.required],
      empleado: [null],
      cliente: [null, Validators.required]
    });

    if (this.dialogData) {
      const vnt: Venta = this.dialogData.venta;
      if (vnt) { this.cargarVenta(vnt); }
    }
  }

  public get tipo() { return this.ventaForm.get("tipo"); }
  public get empleado() { return this.ventaForm.get("empleado"); }
  public get cliente() { return this.ventaForm.get("cliente"); }

  public get esNueva() { return isNaN(this._idVenta); }

  ngOnInit() {
    this.clientes$ = this.clHttpSvc.listarClientes();
    this.empleados$ = this.empHttpSvc.listarEmpleados();
  }

  private cargarVenta(vnt: Venta): void {

    this.ventaForm.disable(NO_EVENT_CHAIN);
    this.showSpinnerSource.next(true);

    this._idVenta = vnt.idVenta;

    this.tipo.setValue(vnt.tipoVenta, NO_EVENT_CHAIN);
    this.cliente.setValue(vnt.idCliente, NO_EVENT_CHAIN);

    if (vnt.idEmpleado) {
      this.empleado.setValue(vnt.idEmpleado, NO_EVENT_CHAIN);
    }

    this.fechaVenta = vnt.fechaVenta;
    this.subtotalVenta = vnt.subtotalVenta;

    this.httpSvc.listarDetalles(vnt).subscribe(
      (detalles: DetalleVenta[]) => {
        this._detallesVenta = detalles;
        this.detallesVenta$ = of(detalles);
      }, 
      err => {
        console.log(err);
        this.snackBar.open("Hubo un problema cargando los detalles de la venta.");
      },
      () => {
        this.showSpinnerSource.next(false);
        this.ventaForm.enable();
      }
    )
  }

  private guardarVenta(vnt: Venta): void {
    this.ventaForm.disable(NO_EVENT_CHAIN);
    this.showSpinnerSource.next(true);
    
    this.httpSvc.guardarVenta(vnt).subscribe(
      (id: number) => {
        if (id) {
          if (vnt.idVenta) {
            this.snackBar.open("Venta N° '"+vnt.idVenta+"' actualizada exitosamente.");
          } else {
            this.snackBar.open("Venta N° '"+id+"' registrada exitosamente.");
          }
          vnt.idVenta = id;
          this.self.close(vnt);
        } else {
          this.snackBar.open("Error al guardar venta.");
        }
      }, err => {
        console.log(err);
        this.snackBar.open("Error al guardar venta.");
        this.showSpinnerSource.next(false);
        this.ventaForm.enable(NO_EVENT_CHAIN);
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
                let dtl: DetalleVenta = new DetalleVenta();
                dtl.idProducto = prod.idProducto;
                dtl.nombreProducto = prod.nombreProducto;
                dtl.precioProducto = prod.precioProducto;
                dtl.unidadesProducto = 1;
                console.log(dtl);
                
                this._detallesVenta.push(dtl);
                if (i+1 === productos.length) {
                  console.log(this._detallesVenta);
                  this.detallesVenta$ = of(this._detallesVenta);
                }
              }
            );
          }
        }
      );
  }

  public onClickIncrementarCantidadProductoDetalle(index: number): void {
    const detalle: DetalleVenta = this._detallesVenta[index];
    if (detalle) {
      detalle.unidadesProducto++;
      this.detallesVenta$ = of(this._detallesVenta);
    }
  }

  public onClickReducirCantidadProductoDetalle(index: number): void {
    const detalle: DetalleVenta = this._detallesVenta[index];
    if (detalle) {
      detalle.unidadesProducto--;
      this.detallesVenta$ = of(this._detallesVenta);
    }
  }

  public onClickBorrarDetalle(index: number) {
    this._detallesVenta.splice(index, 1);
    this.detallesVenta$ = of(this._detallesVenta);
  }

  public onClickAceptar(): void {
    let nuevo: Venta = {
      idVenta: this._idVenta? this._idVenta : null,
      tipoVenta: this.tipo.value,
      fechaVenta: this.fechaVenta? this.fechaVenta: null,
      idCliente: this.cliente.value,
      idEmpleado: this.empleado.value,
      detallesVenta: this._detallesVenta,
      subtotalVenta: null
    };

    this.guardarVenta(nuevo);
  }

  public onClickCancelar(): void {
    this.self.close();
  }

  @Input() public set Venta(emp: Venta) {
    if (emp) {
      this.cargarVenta(emp);
    } else {
      this.ventaForm.reset();
    }
  }

}
