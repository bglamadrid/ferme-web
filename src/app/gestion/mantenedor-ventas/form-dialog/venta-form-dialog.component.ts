import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AgregarProductoDialogComponent } from 'src/app/gestion/get-productos-array-dialog/agregar-producto.component';
import { MSJ_ERROR_COMM_SRV, REACTIVE_FORMS_ISOLATE, VENTA_TIPO_BOLETA, VENTA_TIPO_FACTURA } from 'src/app/shared/constantes';
import { crearDetalleVentaDesdeProducto } from 'src/app/shared/funciones';
import { CompositeEntityDataService } from 'src/data/composite-entity.data.iservice';
import { EntityDataService } from 'src/data/entity.data.iservice';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';
import { Cliente } from 'src/models/entities/Cliente';
import { DetalleVenta } from 'src/models/entities/DetalleVenta';
import { Empleado } from 'src/models/entities/Empleado';
import { Producto } from 'src/models/entities/Producto';
import { Venta } from 'src/models/entities/Venta';
import { AuthService } from 'src/app/auth.service';

export interface VentaFormDialogGestionData {
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
  selector: 'app-venta-form-dialog-gestion',
  templateUrl: './venta-form-dialog.component.html',
  styleUrls: [
    '../../../../assets/styles/formularios.css',
    './venta-form-dialog.component.css'
  ]
})
export class VentaFormDialogGestionComponent
  implements OnInit {

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
    @Inject(MAT_DIALOG_DATA) data: VentaFormDialogGestionData,
    @Inject(DATA_SERVICE_ALIASES.sales) protected saleDataService: CompositeEntityDataService<Venta, DetalleVenta>,
    @Inject(DATA_SERVICE_ALIASES.clients) protected clientDataService: EntityDataService<Cliente>,
    @Inject(DATA_SERVICE_ALIASES.employees) protected employeeDataService: EntityDataService<Empleado>,
    protected dialog: MatDialogRef<VentaFormDialogGestionComponent>,
    protected snackBarService: MatSnackBar,
    protected formBuilder: FormBuilder,
    protected authService: AuthService,
    protected dialogService: MatDialog
  ) {
    this.cargando = false;
    this.guardando = false;

    this.detallesVenta = [];
    this.detallesVentaSource = new BehaviorSubject([]);
    this.subtotalVentaSource = new BehaviorSubject(0);
    this.totalVentaSource = new BehaviorSubject(0);

    this.fechaVenta = (new Date()).toLocaleDateString();
    this.detallesVenta$ = this.detallesVentaSource.asObservable();
    this.subtotalVenta$ = this.subtotalVentaSource.asObservable();
    this.totalVenta$ = this.totalVentaSource.asObservable();
    this.columnasTabla = [ 'producto', 'precio', 'cantidad', 'acciones' ];

    this.ventaForm = this.formBuilder.group({
      tipo: [null, Validators.required],
      empleado: [null],
      cliente: [null, Validators.required]
    });

    const item: Venta = (data?.venta) ? data.venta : new Venta();
    this.cargarVenta(item);
  }

  public get tipo() { return this.ventaForm.get('tipo'); }
  public get empleado() { return this.ventaForm.get('empleado'); }
  public get cliente() { return this.ventaForm.get('cliente'); }

  public get esNueva() { return isNaN(this.idVenta); }

  ngOnInit() {
    this.clientes$ = this.clientDataService.readAll();
    this.empleados$ = this.employeeDataService.readAll();
  }

  protected cargarVenta(vnt: Venta): void {

    this.ventaForm.disable(REACTIVE_FORMS_ISOLATE);
    this.cargando = true;

    this.idVenta = vnt.id;

    this.tipo.setValue(vnt.tipoVenta, REACTIVE_FORMS_ISOLATE);
    this.cliente.setValue(vnt.idCliente, REACTIVE_FORMS_ISOLATE);

    if (vnt.idEmpleado) {
      this.empleado.setValue(vnt.idEmpleado, REACTIVE_FORMS_ISOLATE);
    }

    this.fechaVenta = vnt.fechaVenta;

    this.saleDataService.readDetailsById(vnt.id).pipe(
      finalize(() => {
        this.cargando = false;
        this.ventaForm.enable();
      })
    ).subscribe(
      (detalles: DetalleVenta[]) => {
        this.actualizarDetalles(detalles);
      },
      err => {
        this.snackBarService.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
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

  protected guardarVenta(vt: Venta): void {
    this.ventaForm.disable(REACTIVE_FORMS_ISOLATE);
    this.cargando = true;

    this.saleDataService.create(vt).subscribe(
      (vt2: Venta) => {
        // TODO: make sure vt2 is not actually vt
        if (vt2.id) {
          if (vt.id) {
            this.snackBarService.open('Venta N° \'' + vt.id + '\' actualizada exitosamente.');
          } else {
            this.snackBarService.open('Venta N° \'' + vt2.id + '\' registrada exitosamente.');
          }
          this.dialog.close(vt2);
        } else {
          this.snackBarService.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
          this.ventaForm.enable(REACTIVE_FORMS_ISOLATE);
          this.guardando = false;
        }
      }, err => {
        this.snackBarService.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
        this.ventaForm.enable(REACTIVE_FORMS_ISOLATE);
        this.guardando = false;
      }
    );
  }

  public onClickAgregarProductos(): void {
    const dg = this.dialogService.open(AgregarProductoDialogComponent, {
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
      id: this.idVenta ? this.idVenta : null,
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
    this.dialog.close();
  }

  @Input() public set Venta(vnt: Venta) {
    if (vnt) {
      this.cargarVenta(vnt);
    } else {
      this.ventaForm.reset();
    }
  }

}
