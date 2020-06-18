import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from, Observable } from 'rxjs';
import { MSJ_ERROR_COMM_SRV } from 'src/app/shared/constantes';
import { Producto } from 'src/models/entities/Producto';
import { MantenedorGestionAbstractComponent } from '../mantenedor-gestion.abstract-component';
import { ProductoFormDialogGestionComponent, ProductoFormDialogGestionData } from './form-dialog/producto-form-dialog.component';
import { MantenedorProductosGestionService } from './mantenedor-productos.service';

@Component({
  selector: 'app-mantenedor-productos-gestion',
  templateUrl: './mantenedor-productos.component.html',
  styleUrls: [
    '../../../assets/styles/navegadores.css'
  ]
})
export class MantenedorProductosGestionComponent
  extends MantenedorGestionAbstractComponent<Producto> {

  public columnasTabla: string[] = [ 'nombre', 'codigo', 'precio', 'stockActual', 'stockCritico', 'tipo', 'acciones' ];

  constructor(
    protected service: MantenedorProductosGestionService,
    protected dialogService: MatDialog,
    protected snackBarService: MatSnackBar
  ) {
    super();
  }

  public abrirDialogoEdicion(item: Producto): Observable<Producto> {

    const dialogConfig: MatDialogConfig = {
      width: '40rem'
    };

    if (item) {
      const dialogData: ProductoFormDialogGestionData = { producto: item };
      dialogConfig.data = dialogData;
    }

    const dialog = this.dialogService.open(ProductoFormDialogGestionComponent, dialogConfig);

    return from(dialog.afterClosed());
  }

  public onClickBorrar(prod: Producto) {
    this.service.eliminarItems([prod]).pipe(r => r[0]).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBarService.open('Producto \'' + prod.nombre + '\' eliminado.');
          this.onCargar();
        } else {
          this.snackBarService.open('Hubo un problema al borrar el producto.');
        }
      },
      () => {
        this.snackBarService.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
      }
    );
  }

}
