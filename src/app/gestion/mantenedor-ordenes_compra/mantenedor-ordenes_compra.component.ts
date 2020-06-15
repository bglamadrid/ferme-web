import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from, Observable } from 'rxjs';
import { MSJ_ERROR_COMM_SRV } from 'src/app/shared/constantes';
import { OrdenCompra } from 'src/models/entities/OrdenCompra';
import { MantenedorGestionAbstractComponent } from '../mantenedor-gestion.abstract-component';
import {
  OrdenCompraFormDialogGestionComponent,
  OrdenCompraFormDialogGestionData
} from './form-dialog/orden_compra-form-dialog.component';
import { MantenedorOrdenesCompraGestionService } from './mantenedor-ordenes-compra.service';

@Component({
  selector: 'app-gestion-ordenes_compra',
  templateUrl: './mantenedor-ordenes_compra.component.html',
  styleUrls: [
    '../../../assets/styles/navegadores.css'
  ]
})
export class MantenedorOrdenesCompraGestionComponent
  extends MantenedorGestionAbstractComponent<OrdenCompra> {

  constructor(
    protected service: MantenedorOrdenesCompraGestionService,
    protected dialogService: MatDialog,
    protected snackBar: MatSnackBar
  ) {
    super();
  }

  public abrirDialogoEdicion(item: OrdenCompra): Observable<OrdenCompra> {

    const dialogConfig: MatDialogConfig = {
      width: '80rem'
    };

    if (item) {
      const dialogData: OrdenCompraFormDialogGestionData = { ordenCompra: item };
      dialogConfig.data = dialogData;
    }

    const dialog = this.dialogService.open(OrdenCompraFormDialogGestionComponent, dialogConfig);

    return from(dialog.afterClosed());
  }

  public onClickBorrar(oc: OrdenCompra) {
    this.service.eliminarItems([oc]).pipe(r => r[0]).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open('Orden de compra eliminada.');
          this.onCargar();
        } else {
          this.snackBar.open('Hubo un problema al borrar la orden de compra.');
        }
      },
      () => {
        this.snackBar.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
       }
    );
  }

}
