import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MSJ_ERROR_COMM_SRV } from 'src/app/shared/constantes';
import { CompositeEntityDataService } from 'src/data/composite-entity.data.iservice';
import { SERVICE_ALIASES } from 'src/data/service-aliases';
import { DetalleVenta } from 'src/models/DetalleVenta';
import { Venta } from 'src/models/Venta';
import { MantenedorGestionComponent } from '../mantenedor-gestion.abstract-component';
import { VentaFormDialogGestionComponent, VentaFormDialogGestionData } from './form-dialog/venta-form-dialog.component';
import { ListadoVentasGestionComponent } from './listado/listado-ventas.component';

@Component({
  selector: 'app-mantenedor-ventas-gestion',
  templateUrl: './mantenedor-ventas.component.html',
  styleUrls: [
    '../../../assets/styles/navegadores.css'
  ]
})
export class MantenedorVentasGestionComponent
  extends MantenedorGestionComponent<Venta> {

  @ViewChild('listado', { static: true }) public listado: ListadoVentasGestionComponent;

  constructor(
    @Inject(SERVICE_ALIASES.sales) protected httpSvc: CompositeEntityDataService<Venta, DetalleVenta>,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) {
    super();

  }

  public cargarItems(): Observable<Venta[]> {
    return this.httpSvc.readAll();
  }

  public abrirDialogoEdicion(item: Venta): Observable<Venta> {

    const dialogConfig: MatDialogConfig = {
      width: '80rem'
    };

    if (item) {
      const dialogData: VentaFormDialogGestionData = { venta: item };
      dialogConfig.data = dialogData;
    }

    const dialog = this.dialog.open(VentaFormDialogGestionComponent, dialogConfig);

    return from(dialog.afterClosed());
  }

  public onClickBorrar(vnt: Venta) {
    this.ocupadoSource.next(true);
    this.httpSvc.deleteById(vnt.idVenta).pipe(
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
