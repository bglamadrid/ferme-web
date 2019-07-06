import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from, Subject, BehaviorSubject } from 'rxjs';
import { Proveedor } from 'src/modelo/Proveedor';
import { ProveedoresListadoComponent } from './listado/listado.component';
import { MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { ProveedorFormularioComponent, ProveedorFormularioDialogData } from './formulario/formulario.component';
import { ProveedoresHttpService } from 'src/http-services/proveedores.service';
import { MantenedorGestionComponent } from '../../compartido/mantenedor/mantenedor.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css'
  ]
})
export class ProveedoresComponent 
extends MantenedorGestionComponent<Proveedor> {

  @ViewChild("listado") public listado: ProveedoresListadoComponent;

  constructor(
    protected httpSvc: ProveedoresHttpService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) { 
    super();
  }

  public cargarItems(): Observable<Proveedor[]> {
    return this.httpSvc.listarProveedores();
  }

  
  public abrirDialogoEdicion(item: Proveedor): Observable<Proveedor> {

    let dialogConfig: MatDialogConfig = {
      width: "40rem",
      height: "29rem"
    };

    if (item) {
      let dialogData: ProveedorFormularioDialogData = { proveedor: item };
      dialogConfig.data = dialogData;
    }
    
    let dialog = this.dialog.open(ProveedorFormularioComponent, dialogConfig);
    
    return from(dialog.afterClosed());
  }

  public onClickBorrar(prov: Proveedor) {
    this._ocupado$.next(true);
    this.httpSvc.borrarProveedor(prov.idProveedor).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open("Proveedor '"+prov.nombreCompletoPersona+"' eliminado.");
          this.onCargar();
        } else {
          this.snackBar.open("Hubo un problema al borrar el empleado.");
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
