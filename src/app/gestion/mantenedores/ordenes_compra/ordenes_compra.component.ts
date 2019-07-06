import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from, Subject, BehaviorSubject } from 'rxjs';
import { OrdenCompra } from 'src/modelo/OrdenCompra';
import { MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { OrdenesCompraHttpService } from 'src/http-services/ordenes_compra.service';
import { OrdenesCompraListadoComponent } from './listado/listado.component';
import { OrdenCompraFormularioComponent, OrdenCompraFormularioDialogData } from './formulario/formulario.component';
import { MantenedorGestionComponent } from '../../compartido/mantenedor/mantenedor.component';

@Component({
  selector: 'app-ordenes-compra',
  templateUrl: './ordenes_compra.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css',
    './ordenes_compra.component.css'
  ]
})
export class OrdenesCompraComponent 
  extends MantenedorGestionComponent<OrdenCompra> {

  @ViewChild("listado") public listado: OrdenesCompraListadoComponent;

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

    let dialogConfig: MatDialogConfig = {
      width: "80rem",
      height: "28rem"
    };

    if (item) {
      let dialogData: OrdenCompraFormularioDialogData = { ordenCompra: item };
      dialogConfig.data = dialogData;
    }
    
    let dialog = this.dialog.open(OrdenCompraFormularioComponent, dialogConfig);
    
    return from(dialog.afterClosed());
  }

  public onClickBorrar(oc: OrdenCompra) {
    this._ocupado$.next(true);
    this.httpSvc.borrarOrdenCompra(oc.idOrdenCompra).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open("Orden de compra eliminada.");
          this.onCargar();
        } else {
          this.snackBar.open("Hubo un problema al borrar la orden de compra.");
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
