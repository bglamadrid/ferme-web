import { Component, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MSJ_ERROR_COMM_SRV } from 'src/app/shared/constantes';
import { OrdenCompra } from 'src/models/OrdenCompra';
import { MantenedorGestionComponent } from '../mantenedor-gestion.abstract-component';
import {
  OrdenCompraFormDialogGestionComponent,
  OrdenCompraFormDialogGestionData
} from './form-dialog/orden_compra-form-dialog.component';
import { ListadoOrdenesCompraGestionComponent } from './listado/listado-ordenes_compra.component';
import { SERVICE_ALIASES } from 'src/data/service-aliases';
import { CompositeEntityDataService } from 'src/data/composite-entity.data.iservice';
import { DetalleOrdenCompra } from 'src/models/DetalleOrdenCompra';

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
    @Inject(SERVICE_ALIASES.purchaseOrders) protected httpSvc: CompositeEntityDataService<OrdenCompra, DetalleOrdenCompra>,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) {
    super();
  }

  public cargarItems(): Observable<OrdenCompra[]> {
    return this.httpSvc.readAll();
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
    this.httpSvc.deleteById(oc.idOrdenCompra).pipe(
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
