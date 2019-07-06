import { Component, ViewChild } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Venta } from 'src/modelo/Venta';
import { VentasListadoComponent } from './listado/listado.component';
import { MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { VentaFormularioComponent, VentaFormularioDialogData } from './formulario/formulario.component';
import { VentasHttpService } from 'src/http-services/ventas.service';
import { MantenedorGestionComponent } from '../../compartido/mantenedor/mantenedor.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css'
  ]
})
export class MantenedorVentasComponent 
  extends MantenedorGestionComponent<Venta> {

  @ViewChild("listado") public listado: VentasListadoComponent;

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

    let dialogConfig: MatDialogConfig = {
      width: "80rem",
      height: "30rem"
    };

    if (item) {
      let dialogData: VentaFormularioDialogData = { venta: item };
      dialogConfig.data = dialogData;
    }
    
    let dialog = this.dialog.open(VentaFormularioComponent, dialogConfig);
    
    return from(dialog.afterClosed());
  }

  public onClickBorrar(vnt: Venta) {
    this._ocupado$.next(true);
    this.httpSvc.borrarVenta(vnt.idVenta).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open("Venta N°'"+vnt.idVenta+"' ("+vnt.fechaVenta+") eliminada.");
          this.onCargar();
        } else {
          this.snackBar.open("Hubo un problema al borrar la venta.");
        }
      },
      err => { 
        this.snackBar.open("Hubo un problema de comunicación con el servidor. Por favor, inténtelo nuevamente.");
        console.log(err);
       },
       () => { this._ocupado$.next(false); }
    );
  }

}
