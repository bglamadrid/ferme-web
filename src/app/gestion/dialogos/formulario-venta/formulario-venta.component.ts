import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { REACTIVE_FORMS_ISOLATE, VENTA_TIPO_BOLETA, VENTA_TIPO_FACTURA, MSJ_ERROR_COMM_SRV } from 'src/app/compartido/constantes';
import { crearDetalleVentaDesdeProducto } from 'src/app/compartido/funciones';
import { AgregarProductoDialogComponent } from 'src/app/gestion/dialogos/agregar-producto/agregar-producto.component';
import { ClientesHttpService } from 'src/http-services/clientes-http.service';
import { EmpleadosHttpService } from 'src/http-services/empleados-http.service';
import { VentasHttpService } from 'src/http-services/ventas-http.service';
import { Cliente } from 'src/modelo/Cliente';
import { DetalleVenta } from 'src/modelo/DetalleVenta';
import { Empleado } from 'src/modelo/Empleado';
import { Producto } from 'src/modelo/Producto';
import { Venta } from 'src/modelo/Venta';
import { AuthService } from 'src/services/auth.service';

export interface VentaFormularioDialogData {
  venta: Venta;
}

export interface TipoVenta {
  codigo: string;
  descripcion: string;
}

export const TIPOS_VENTA: TipoVenta[] = [
  { codigo: VENTA_TIPO_BOLETA, descripcion: 'Boleta' },
  { codigo: VENTA_TIPO_FACTURA, descripcion: 'Factura' }
];

@Component({
  selector: 'app-venta-formulario-dialog',
  templateUrl: './formulario-venta.component.html',
  styleUrls: [
    '../../../compartido/formularios.css',
    './formulario-venta.component.css'
  ]
})
export class VentaFormularioDialogComponent implements OnInit {

  protected idVenta: number;
  protected detallesVenta: DetalleVenta[];
  protected detallesVentaSource: BehaviorSubject<DetalleVenta[]>;
  protected subtotalVentaSource: BehaviorSubject<number>;
  protected totalVentaSource: BehaviorSubject<number>;

  public get tipos(): TipoVenta[] { return TIPOS_VENTA; }
  public empleados$: Observable<Empleado[]>;
  public clientes$: Observable<Cliente[]>;

  public cargando: boolean;
  public guardando: boolean;

  public ventaForm: FormGroup;

  @ViewChild('tablaDetalles', { static: true }) public tablaDetalles: MatTable<DetalleVenta>;
  public columnasTabla: string[];

  public fechaVenta: string;
  public detallesVenta$: Observable<DetalleVenta[]>;
  public subtotalVenta$: Observable<number>;
  public totalVenta$: Observable<number>;


  constructor(
    @Inject(MAT_DIALOG_DATA) protected dialogData: VentaFormularioDialogData,
    protected self: MatDialogRef<VentaFormularioDialogComponent>,
    protected snackBar: MatSnackBar,
    protected fb: FormBuilder,
    protected httpSvc: VentasHttpService,
    protected empHttpSvc: EmpleadosHttpService,
    protected clHttpSvc: ClientesHttpService,
    protected authSvc: AuthService,
    protected dialog: MatDialog
  ) {
    this.cargando = true;
    this.guardando = true;
    this.detallesVenta = [];
    this.detallesVentaSource = new BehaviorSubject([]);
    this.subtotalVentaSource = new BehaviorSubject(0);
    this.totalVentaSource = new BehaviorSubject(0);

    this.fechaVenta = (new Date()).toLocaleDateString();
    this.detallesVenta$ = this.detallesVentaSource.asObservable();
    this.subtotalVenta$ = this.subtotalVentaSource.asObservable();
    this.totalVenta$ = this.totalVentaSource.asObservable();
    this.columnasTabla = [ 'producto', 'precio', 'cantidad', 'acciones' ];

    this.ventaForm = this.fb.group({
      tipo: [null, Validators.required],
      empleado: [null],
      cliente: [null, Validators.required]
    });


    if (this.dialogData && this.dialogData.venta) {
      const vnt: Venta = this.dialogData.venta;
      this.cargarVenta(vnt);
    } else {
      this.empleado.setValue(this.authSvc.sesion.idEmpleado);
      this.cargando = false;
    }
  }

  public get tipo() { return this.ventaForm.get('tipo'); }
  public get empleado() { return this.ventaForm.get('empleado'); }
  public get cliente() { return this.ventaForm.get('cliente'); }

  public get esNueva() { return isNaN(this.idVenta); }

  ngOnInit() {
    this.clientes$ = this.clHttpSvc.listarClientes();
    this.empleados$ = this.empHttpSvc.listarEmpleados();
  }

  protected cargarVenta(vnt: Venta): void {

    this.ventaForm.disable(REACTIVE_FORMS_ISOLATE);
    this.cargando = true;

    this.idVenta = vnt.idVenta;

    this.tipo.setValue(vnt.tipoVenta, REACTIVE_FORMS_ISOLATE);
    this.cliente.setValue(vnt.idCliente, REACTIVE_FORMS_ISOLATE);

    if (vnt.idEmpleado) {
      this.empleado.setValue(vnt.idEmpleado, REACTIVE_FORMS_ISOLATE);
    }

    this.fechaVenta = vnt.fechaVenta;

    this.httpSvc.listarDetalles(vnt).pipe(
      finalize(() => {
        this.cargando = false;
        this.ventaForm.enable();
      })
    ).subscribe(
      (detalles: DetalleVenta[]) => {
        this.actualizarDetalles(detalles);
      },
      err => {
        this.snackBar.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
      }
    );
  }

  protected actualizarResumen() {

    let subtotalAux = 0;
    for (const item of this.detallesVenta) {
      if (item.precioProducto && item.unidadesProducto) {
        const unidades = item.unidadesProducto;

        const detalleValor = item.precioProducto * unidades;
        subtotalAux += detalleValor;
      }
    }

    const totalAux = Math.trunc(subtotalAux * 1.19);

    this.subtotalVentaSource.next(subtotalAux);
    this.totalVentaSource.next(totalAux);
  }

  protected actualizarDetalles(detalles: DetalleVenta[]) {
    this.detallesVenta = detalles;
    this.actualizarResumen();
    this.detallesVentaSource.next(detalles);
  }

  protected guardarVenta(vnt: Venta): void {
    this.ventaForm.disable(REACTIVE_FORMS_ISOLATE);
    this.cargando = true;

    this.httpSvc.guardarVenta(vnt).subscribe(
      (id: number) => {
        if (id) {
          if (vnt.idVenta) {
            this.snackBar.open('Venta N° \'' + vnt.idVenta + '\' actualizada exitosamente.');
          } else {
            this.snackBar.open('Venta N° \'' + id + '\' registrada exitosamente.');
          }
          vnt.idVenta = id;
          this.self.close(vnt);
        } else {
          this.snackBar.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
          this.ventaForm.enable(REACTIVE_FORMS_ISOLATE);
          this.guardando = false;
        }
      }, err => {
        this.snackBar.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
        this.ventaForm.enable(REACTIVE_FORMS_ISOLATE);
        this.guardando = false;
      }
    );
  }

  public onClickAgregarProductos(): void {
    const dg = this.dialog.open(AgregarProductoDialogComponent, {
      width: '70rem'
    });

    dg.afterClosed().subscribe(
        (productos: Producto[]) => {
          if (productos && productos.length > 0) {

            const nuevosDetalles = productos.map(
              (prod: Producto) => {
                return crearDetalleVentaDesdeProducto(prod);
              }
            );
            this.detallesVenta.push(...nuevosDetalles);
            this.actualizarResumen();
            this.detallesVentaSource.next(this.detallesVenta);
          }
        }
      );
  }

  public onClickIncrementarCantidadProductoDetalle(index: number): void {
    const detalle: DetalleVenta = this.detallesVenta[index];
    if (detalle) {
      detalle.unidadesProducto++;
      this.actualizarResumen();
      this.detallesVentaSource.next(this.detallesVenta);
    }
  }

  public onClickReducirCantidadProductoDetalle(index: number): void {
    const detalle: DetalleVenta = this.detallesVenta[index];
    if (detalle) {
      detalle.unidadesProducto--;
      this.actualizarResumen();
      this.detallesVentaSource.next(this.detallesVenta);
    }
  }

  public onClickBorrarDetalle(index: number) {
    this.detallesVenta.splice(index, 1);
    this.actualizarResumen();
    this.detallesVentaSource.next(this.detallesVenta);
  }

  public onClickAceptar(): void {
    const nuevo: Venta = {
      idVenta: this.idVenta ? this.idVenta : null,
      tipoVenta: this.tipo.value,
      fechaVenta: this.fechaVenta ? this.fechaVenta : null,
      idCliente: this.cliente.value,
      idEmpleado: this.empleado.value,
      detallesVenta: this.detallesVenta,
      subtotalVenta: null
    };

    this.guardarVenta(nuevo);
  }

  public onClickCancelar(): void {
    this.self.close();
  }

  @Input() public set Venta(vnt: Venta) {
    if (vnt) {
      this.cargarVenta(vnt);
    } else {
      this.ventaForm.reset();
    }
  }

}
