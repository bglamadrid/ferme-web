import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from, Observable } from 'rxjs';
import { MSJ_ERROR_COMM_SRV } from 'src/app/shared/constantes';
import { Usuario } from 'src/models/entities/Usuario';
import { MantenedorGestionAbstractComponent } from '../mantenedor-gestion.abstract-component';
import { UsuarioFormDialogGestionComponent, UsuarioFormDialogGestionData } from './form-dialog/usuario-form-dialog.component';
import { MantenedorUsuariosGestionService } from './mantenedor-usuarios.service';

@Component({
  selector: 'app-mantenedor-usuarios-gestion',
  templateUrl: './mantenedor-usuarios.component.html',
  styleUrls: [
    '../../../assets/styles/navegadores.css'
  ]
})
export class MantenedorUsuariosGestionComponent
  extends MantenedorGestionAbstractComponent<Usuario> {

  public columnasTabla: string[] = [ 'nombre', 'fechaCreacion', 'nombreCompleto', 'rut', 'acciones' ];

  constructor(
    protected service: MantenedorUsuariosGestionService,
    protected dialogService: MatDialog,
    protected snackBarService: MatSnackBar
  ) {
    super();
  }

  public abrirDialogoEdicion(item: Usuario): Observable<Usuario> {

    const dialogConfig: MatDialogConfig = {
      width: '40rem'
    };

    if (item) {
      const dialogData: UsuarioFormDialogGestionData = { usuario: item };
      dialogConfig.data = dialogData;
    }

    const dialog = this.dialogService.open(UsuarioFormDialogGestionComponent, dialogConfig);

    return from(dialog.afterClosed());
  }

  public onClickBorrar(usr: Usuario) {
    this.service.eliminarItems([usr]).pipe(r => r[0]).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBarService.open('Usuario \'' + usr.nombre + '\' eliminado.');
          this.onCargar();
        } else {
          this.snackBarService.open('Hubo un problema al borrar el empleado.');
        }
      },
      () => {
        this.snackBarService.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
       }
    );
  }

}
