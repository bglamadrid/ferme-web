import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MSJ_ERROR_COMM_SRV } from 'src/app/compartido/constantes';
import { VentasHttpService } from 'src/http-services/ventas-http.service';
import { Venta } from 'src/modelo/Venta';
import { MantenedorGestionComponent } from '../../compartido/mantenedor/mantenedor.component';
import {
  VentaFormularioDialogComponent,
  VentaFormularioDialogData
} from '../../dialogos/formulario-venta/formulario-venta.component';
import { VentasListadoComponent } from './listado/listado.component';

@Component({
  selector: 'app-gestion-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css'
  ]
})
export class VentasGestionComponent
  extends MantenedorGestionComponent<Venta> {

  @ViewChild('listado', { static: true }) public listado: VentasListadoComponent;

  constructor(
    protected httpSvc: VentasHttpService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) {
    super();

  }

  public cargarItems(): Observable<Venta[]> {
    return this.httpSvc.listarVentas();
  }

  public abrirDialogoEdicion(item: Venta): Observable<Venta> {

    const dialogConfig: MatDialogConfig = {
      width: '80rem'
    };

    if (item) {
      const dialogData: VentaFormularioDialogData = { venta: item };
      dialogConfig.data = dialogData;
    }

    const dialog = this.dialog.open(VentaFormularioDialogComponent, dialogConfig);

    return from(dialog.afterClosed());
  }

  public onClickBorrar(vnt: Venta) {
    this.ocupadoSource.next(true);
    this.httpSvc.borrarVenta(vnt.idVenta).pipe(
      finalize(() => { this.ocupadoSource.next(false); })
    ).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open('Venta N°' + vnt.idVenta + ' (' + vnt.fechaVenta + ') eliminada.');
          this.onCargar();
        } else {
          this.snackBar.open('Hubo un problema al borrar la venta.');
        }
      },
      () => {
        this.snackBar.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
       }
    );
  }

}
