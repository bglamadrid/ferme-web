import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from, Observable } from 'rxjs';
import { MSJ_ERROR_COMM_SRV } from 'src/app/shared/constantes';
import { Venta } from 'src/models/entities/Venta';
import { MantenedorGestionAbstractComponent } from '../mantenedor-gestion.abstract-component';
import { VentaFormDialogGestionComponent, VentaFormDialogGestionData } from './form-dialog/venta-form-dialog.component';
import { MantenedorVentasGestionService } from './mantenedor-ventas.service';

@Component({
  selector: 'app-mantenedor-ventas-gestion',
  templateUrl: './mantenedor-ventas.component.html',
  styleUrls: [
    '../../../assets/styles/navegadores.css'
  ]
})
export class MantenedorVentasGestionComponent
  extends MantenedorGestionAbstractComponent<Venta> {

  public columnasTabla: string[] = [ 'numero', 'fecha', 'acciones' ];

  constructor(
    protected service: MantenedorVentasGestionService,
    protected dialogService: MatDialog,
    protected snackBarService: MatSnackBar
  ) {
    super();
  }

  public abrirDialogoEdicion(item: Venta): Observable<Venta> {

    const dialogConfig: MatDialogConfig = {
      width: '80rem'
    };

    if (item) {
      const dialogData: VentaFormDialogGestionData = { venta: item };
      dialogConfig.data = dialogData;
    }

    const dialog = this.dialogService.open(VentaFormDialogGestionComponent, dialogConfig);

    return from(dialog.afterClosed());
  }

  public onClickBorrar(vnt: Venta) {
    this.service.eliminarItems([vnt]).pipe(r => r[0]).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBarService.open('Venta N°' + vnt.id + ' (' + vnt.fechaVenta + ') eliminada.');
          this.onCargar();
        } else {
          this.snackBarService.open('Hubo un problema al borrar la venta.');
        }
      },
      () => {
        this.snackBarService.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
       }
    );
  }

}
