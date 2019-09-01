import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MSJ_ERROR_COMM_SRV } from 'src/app/compartido/constantes';
import { ProveedoresHttpService } from 'src/http-services/proveedores-http.service';
import { Proveedor } from 'src/modelo/Proveedor';
import { MantenedorGestionComponent } from '../../compartido/mantenedor/mantenedor.component';
import {
  ProveedorFormularioDialogComponent,
  ProveedorFormularioDialogData
} from '../../dialogos/formulario-proveedor/formulario-proveedor.component';
import { ProveedoresListadoComponent } from './listado/listado.component';

@Component({
  selector: 'app-gestion-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css'
  ]
})
export class ProveedoresGestionComponent
extends MantenedorGestionComponent<Proveedor> {

  @ViewChild('listado') public listado: ProveedoresListadoComponent;

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

    const dialogConfig: MatDialogConfig = {
      width: '40rem'
    };

    if (item) {
      const dialogData: ProveedorFormularioDialogData = { proveedor: item };
      dialogConfig.data = dialogData;
    }

    const dialog = this.dialog.open(ProveedorFormularioDialogComponent, dialogConfig);

    return from(dialog.afterClosed());
  }

  public onClickBorrar(prov: Proveedor) {
    this.ocupadoSource.next(true);
    this.httpSvc.borrarProveedor(prov.idProveedor).pipe(
      finalize(() => { this.ocupadoSource.next(false); })
    ).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open('Proveedor \'' + prov.nombreCompletoPersona + '\' eliminado.');
          this.onCargar();
        } else {
          this.snackBar.open('Hubo un problema al borrar el empleado.');
        }
      },
      () => {
        this.snackBar.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
       }
    );
  }

}
