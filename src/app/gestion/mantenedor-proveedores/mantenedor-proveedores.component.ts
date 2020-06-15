import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from, Observable } from 'rxjs';
import { MSJ_ERROR_COMM_SRV } from 'src/app/shared/constantes';
import { Proveedor } from 'src/models/entities/Proveedor';
import { MantenedorGestionAbstractComponent } from '../mantenedor-gestion.abstract-component';
import { ProveedorFormDialogGestionComponent, ProveedorFormDialogGestionData } from './form-dialog/proveedor-form-dialog.component';
import { MantenedorProveedoresGestionService } from './mantenedor-proveedores.service';

@Component({
  selector: 'app-mantenedor-proveedores-gestion',
  templateUrl: './mantenedor-proveedores.component.html',
  styleUrls: [
    '../../../assets/styles/navegadores.css'
  ]
})
export class MantenedorProveedoresGestionComponent
extends MantenedorGestionAbstractComponent<Proveedor> {

  constructor(
    protected service: MantenedorProveedoresGestionService,
    protected dialogService: MatDialog,
    protected snackBar: MatSnackBar
  ) {
    super();
  }

  public abrirDialogoEdicion(item: Proveedor): Observable<Proveedor> {

    const dialogConfig: MatDialogConfig = {
      width: '40rem'
    };

    if (item) {
      const dialogData: ProveedorFormDialogGestionData = { proveedor: item };
      dialogConfig.data = dialogData;
    }

    const dialog = this.dialogService.open(ProveedorFormDialogGestionComponent, dialogConfig);

    return from(dialog.afterClosed());
  }

  public onClickBorrar(prov: Proveedor) {
    this.service.eliminarItems([prov]).pipe(r => r[0]).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open('Proveedor \'' + prov.nombre + '\' eliminado.');
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
