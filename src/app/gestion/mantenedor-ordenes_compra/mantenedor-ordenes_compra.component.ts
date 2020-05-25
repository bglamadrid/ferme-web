import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MSJ_ERROR_COMM_SRV } from 'src/app/shared/constantes';
import { OrdenesCompraHttpService } from 'src/http-services/ordenes_compra-http.service';
import { OrdenCompra } from 'src/models/OrdenCompra';
import { MantenedorGestionComponent } from '../mantenedor-gestion.abstract-component';
import {
  OrdenCompraFormDialogGestionComponent,
  OrdenCompraFormDialogGestionData
} from './form-dialog/orden_compra-form-dialog.component';
import { ListadoOrdenesCompraGestionComponent } from './listado/listado-ordenes_compra.component';

@Component({
  selector: 'app-gestion-ordenes_compra',
  templateUrl: './mantenedor-ordenes_compra.component.html',
  styleUrls: [
    '../../../assets/styles/navegadores.css'
  ]
})
export class MantenedorOrdenesCompraGestionComponent
  extends MantenedorGestionComponent<OrdenCompra> {

  @ViewChild('listado', { static: true }) public listado: ListadoOrdenesCompraGestionComponent;

  constructor(
    protected httpSvc: OrdenesCompraHttpService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) {
    super();
  }

  public cargarItems(): Observable<OrdenCompra[]> {
    return this.httpSvc.listarOrdenesCompra();
  }



  public abrirDialogoEdicion(item: OrdenCompra): Observable<OrdenCompra> {

    const dialogConfig: MatDialogConfig = {
      width: '80rem'
    };

    if (item) {
      const dialogData: OrdenCompraFormDialogGestionData = { ordenCompra: item };
      dialogConfig.data = dialogData;
    }

    const dialog = this.dialog.open(OrdenCompraFormDialogGestionComponent, dialogConfig);

    return from(dialog.afterClosed());
  }

  public onClickBorrar(oc: OrdenCompra) {
    this.ocupadoSource.next(true);
    this.httpSvc.borrarOrdenCompra(oc.idOrdenCompra).pipe(
      finalize(() => { this.ocupadoSource.next(false); })
    ).subscribe(
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
