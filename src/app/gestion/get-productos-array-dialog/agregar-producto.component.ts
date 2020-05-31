import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Producto } from 'src/models/entities/Producto';
import { FormBuilder } from '@angular/forms';
import { SharedHttpDataService } from 'src/data/http/shared.http-data.service';
import { ProductosHttpDataService } from 'src/data/http/productos.http-data.service';
import { FiltrosProductos } from 'src/app/shared/filtros-productos-panel/filtros-productos-panel.component';
import { MSJ_ERROR_COMM_SRV } from 'src/app/shared/constantes';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';
import { EntityDataService } from 'src/data/entity.data.iservice';

export interface AgregarProductoDialogData {
  proveedor: number;
}

@Component({
  selector: 'app-agregar-producto-dialog',
  templateUrl: './agregar-producto.component.html',
  styleUrls: [
    '../../../assets/styles/formularios.css',
    './agregar-producto.component.css'
  ]
})
export class AgregarProductoDialogComponent implements OnInit {

  public cargando: boolean;
  public hayProductos: boolean;

  @ViewChild('tablaProductosDisponibles', { static: true }) public tablaProductosDisponibles: MatTable<Producto>;
  @ViewChild('tablaProductosSeleccionados', { static: true }) public tablaProductosSeleccionados: MatTable<Producto>;
  public columnasTabla: string[];

  protected productosAgregar: Producto[];

  constructor(
    @Inject(MAT_DIALOG_DATA) protected dialogData: AgregarProductoDialogData,
    protected self: MatDialogRef<AgregarProductoDialogComponent>,
    @Inject(DATA_SERVICE_ALIASES.shared) protected sharedSvc: SharedHttpDataService,
    @Inject(DATA_SERVICE_ALIASES.products) protected prodSvc: EntityDataService<Producto>,
    protected fb: FormBuilder,
    protected snackBar: MatSnackBar
  ) {
    this.cargando = true;

    this.productosAgregar = [];
    this.columnasTabla = [ 'nombre', 'precio', 'acciones' ];

    this.hayProductos = false;

    // if (this.dialogData) {
    //   this.onFiltrosChange(this.dialogData);
    // } else {
    this.onFiltrosChange({});
    // }
  }

  ngOnInit() {
    this.tablaProductosSeleccionados.dataSource = of(this.productosAgregar);
    // this.onFiltrosChange({});
  }


  public onFiltrosChange(filtros: FiltrosProductos): void {
    this.cargando = true;
    let obs: Observable<Producto[]>;

    if (filtros !== {}) {
      obs = this.prodSvc.readFiltered(filtros);
    } else {
      obs = this.prodSvc.readAll();
    }

    obs.pipe(
      finalize(() => { this.cargando = false; })
    ).subscribe(
      (prods: Producto[]) => {
        this.tablaProductosDisponibles.dataSource = of(prods);
      },
      () => {
        this.tablaProductosDisponibles.dataSource = of([]);
        this.snackBar.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
      }
    );
  }

  public onClickIncluirProducto(prod: Producto): void {
    this.productosAgregar.push(prod);
    this.tablaProductosSeleccionados.dataSource = of(this.productosAgregar);
    if (this.productosAgregar.length === 1) {
      this.hayProductos = true;
    }
  }

  public onClickRetirarProducto(index: number): void {
    this.productosAgregar.splice(index, 1);
    this.tablaProductosSeleccionados.dataSource = of(this.productosAgregar);
    if (this.productosAgregar.length === 0) {
      this.hayProductos = false;
    }
  }

  public onClickAceptar(): void {
    this.self.close(this.productosAgregar);
  }

  public onClickCancelar(): void {
    this.self.close([]);
  }

}
