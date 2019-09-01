import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MSJ_ERROR_COMM_SRV } from 'src/app/compartido/constantes';
import { ProductosHttpService } from 'src/http-services/productos-http.service';
import { Producto } from 'src/modelo/Producto';
import { MantenedorGestionComponent } from '../../compartido/mantenedor/mantenedor.component';
import {
  ProductoFormularioDialogComponent,
  ProductoFormularioDialogData
} from '../../dialogos/formulario-producto/formulario-producto.component';
import { ProductosListadoComponent } from './listado/listado.component';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './productos.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css'
  ]
})
export class ProductosGestionComponent
  extends MantenedorGestionComponent<Producto> {

  @ViewChild('listado') public listado: ProductosListadoComponent;

  constructor(
    protected httpSvc: ProductosHttpService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) {
    super();
  }

  public cargarItems(): Observable<Producto[]> {
    return this.httpSvc.listarProductos();
  }

  public abrirDialogoEdicion(item: Producto): Observable<Producto> {

    const dialogConfig: MatDialogConfig = {
      width: '40rem'
    };

    if (item) {
      const dialogData: ProductoFormularioDialogData = { producto: item };
      dialogConfig.data = dialogData;
    }

    const dialog = this.dialog.open(ProductoFormularioDialogComponent, dialogConfig);

    return from(dialog.afterClosed());
  }

  public onClickBorrar(prod: Producto) {
    this.ocupadoSource.next(true);
    this.httpSvc.borrarProducto(prod.idProducto).pipe(
      finalize(() => { this.ocupadoSource.next(false); })
    ).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open('Producto \'' + prod.nombreProducto + '\' eliminado.');
          this.onCargar();
        } else {
          this.snackBar.open('Hubo un problema al borrar el producto.');
        }
      },
      () => {
        this.snackBar.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
      }
    );
  }

}
