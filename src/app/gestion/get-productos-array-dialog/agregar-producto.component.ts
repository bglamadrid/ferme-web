import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MSJ_ERROR_COMM_SRV } from 'src/app/shared/constantes';
import { FiltrosProductos } from 'src/app/shared/filtros-productos-panel/filtros-productos-panel.component';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';
import { EntityDataService } from 'src/data/entity.data.iservice';
import { SharedDataService } from 'src/data/shared.data.iservice';
import { Producto } from 'src/models/entities/Producto';

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
export class AgregarProductoDialogComponent
  implements OnInit {

  public cargando: boolean;
  public hayProductos: boolean;

  @ViewChild('tablaProductosDisponibles', { static: true }) public tablaProductosDisponibles: MatTable<Producto>;
  @ViewChild('tablaProductosSeleccionados', { static: true }) public tablaProductosSeleccionados: MatTable<Producto>;
  public columnasTabla: string[] = [ 'nombre', 'precio', 'acciones' ];

  protected productosAgregar: Producto[];

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: AgregarProductoDialogData,
    @Inject(DATA_SERVICE_ALIASES.shared) protected sharedDataService: SharedDataService,
    @Inject(DATA_SERVICE_ALIASES.products) protected productDataService: EntityDataService<Producto>,
    protected dialog: MatDialogRef<AgregarProductoDialogComponent>,
    protected formBuilder: FormBuilder,
    protected snackBarService: MatSnackBar
  ) {
    this.cargando = true;

    this.productosAgregar = [];

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
      obs = this.productDataService.readFiltered(filtros);
    } else {
      obs = this.productDataService.readAll();
    }

    obs.pipe(
      finalize(() => { this.cargando = false; })
    ).subscribe(
      (prods: Producto[]) => {
        this.tablaProductosDisponibles.dataSource = of(prods);
      },
      () => {
        this.tablaProductosDisponibles.dataSource = of([]);
        this.snackBarService.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
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
    this.dialog.close(this.productosAgregar);
  }

  public onClickCancelar(): void {
    this.dialog.close([]);
  }

}
