import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MatDialogRef, MatTable, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Producto } from 'src/modelo/Producto';
import { FormBuilder } from '@angular/forms';
import { GestionSharedHttpService } from 'src/http-services/gestion-shared-http.service';
import { ProductosHttpService } from 'src/http-services/productos-http.service';
import { FiltrosProductos } from 'src/app/compartido/filtros-productos/filtros-productos.component';
import { MSJ_ERROR_COMM_SRV } from 'src/app/compartido/constantes';

export interface AgregarProductoDialogData {
  proveedor: number;
}

@Component({
  selector: 'app-agregar-producto-dialog',
  templateUrl: './agregar-producto.component.html',
  styleUrls: [
    '../../compartido/formularios.css',
    './agregar-producto.component.css'
  ]
})
export class AgregarProductoDialogComponent implements OnInit {

  public cargando: boolean;
  public hayProductos: boolean;

  @ViewChild('tablaProductosDisponibles') public tablaProductosDisponibles: MatTable<Producto>;
  @ViewChild('tablaProductosSeleccionados') public tablaProductosSeleccionados: MatTable<Producto>;
  public columnasTabla: string[];

  protected productosAgregar: Producto[];

  constructor(
    @Inject(MAT_DIALOG_DATA) protected dialogData: AgregarProductoDialogData,
    protected self: MatDialogRef<AgregarProductoDialogComponent>,
    protected sharedSvc: GestionSharedHttpService,
    protected prodSvc: ProductosHttpService,
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
      obs = this.prodSvc.listarProductosFiltrados(filtros);
    } else {
      obs = this.prodSvc.listarProductos();
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
