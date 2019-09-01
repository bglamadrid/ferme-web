import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MSJ_ERROR_COMM_SRV } from 'src/app/compartido/constantes';
import { OrdenesCompraHttpService } from 'src/http-services/ordenes_compra-http.service';
import { OrdenCompra } from 'src/modelo/OrdenCompra';
import { MantenedorGestionComponent } from '../../compartido/mantenedor/mantenedor.component';
import {
  OrdenCompraFormularioDialogComponent,
  OrdenCompraFormularioDialogData
} from '../../dialogos/formulario-orden-compra/formulario-orden-compra.component';
import { OrdenesCompraListadoComponent } from './listado/listado.component';

@Component({
  selector: 'app-gestion-ordenes_compra',
  templateUrl: './ordenes_compra.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css'
  ]
})
export class OrdenesCompraGestionComponent
  extends MantenedorGestionComponent<OrdenCompra> {

  @ViewChild('listado') public listado: OrdenesCompraListadoComponent;

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
      const dialogData: OrdenCompraFormularioDialogData = { ordenCompra: item };
      dialogConfig.data = dialogData;
    }

    const dialog = this.dialog.open(OrdenCompraFormularioDialogComponent, dialogConfig);

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
