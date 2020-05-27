import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MSJ_ERROR_COMM_SRV } from 'src/app/shared/constantes';
import { EntityDataService } from 'src/data/entity.data.iservice';
import { SERVICE_ALIASES } from 'src/data/service-aliases';
import { Proveedor } from 'src/models/Proveedor';
import { MantenedorGestionComponent } from '../mantenedor-gestion.abstract-component';
import { ProveedorFormDialogGestionComponent, ProveedorFormDialogGestionData } from './form-dialog/proveedor-form-dialog.component';
import { ListadoProveedoresGestionComponent } from './listado/listado-proveedores.component';

@Component({
  selector: 'app-mantenedor-proveedores-gestion',
  templateUrl: './mantenedor-proveedores.component.html',
  styleUrls: [
    '../../../assets/styles/navegadores.css'
  ]
})
export class MantenedorProveedoresGestionComponent
extends MantenedorGestionComponent<Proveedor> {

  @ViewChild('listado', { static: true }) public listado: ListadoProveedoresGestionComponent;

  constructor(
    @Inject(SERVICE_ALIASES.providers) protected httpSvc: EntityDataService<Proveedor>,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) {
    super();
  }

  public cargarItems(): Observable<Proveedor[]> {
    return this.httpSvc.readAll();
  }


  public abrirDialogoEdicion(item: Proveedor): Observable<Proveedor> {

    const dialogConfig: MatDialogConfig = {
      width: '40rem'
    };

    if (item) {
      const dialogData: ProveedorFormDialogGestionData = { proveedor: item };
      dialogConfig.data = dialogData;
    }

    const dialog = this.dialog.open(ProveedorFormDialogGestionComponent, dialogConfig);

    return from(dialog.afterClosed());
  }

  public onClickBorrar(prov: Proveedor) {
    this.ocupadoSource.next(true);
    this.httpSvc.deleteById(prov.idProveedor).pipe(
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
