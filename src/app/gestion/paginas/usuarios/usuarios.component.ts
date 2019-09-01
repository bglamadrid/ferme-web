import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MSJ_ERROR_COMM_SRV } from 'src/app/compartido/constantes';
import { UsuariosHttpService } from 'src/http-services/usuarios-http.service';
import { Usuario } from 'src/modelo/Usuario';
import { MantenedorGestionComponent } from '../../compartido/mantenedor/mantenedor.component';
import {
  UsuarioFormularioDialogComponent,
  UsuarioFormularioDialogData
} from '../../dialogos/formulario-usuario/formulario-usuario.component';
import { UsuariosListadoComponent } from './listado/listado.component';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css'
  ]
})
export class UsuariosGestionComponent
  extends MantenedorGestionComponent<Usuario> {

  @ViewChild('listado') public listado: UsuariosListadoComponent;

  constructor(
    protected httpSvc: UsuariosHttpService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) {
    super();
  }

  public cargarItems(): Observable<Usuario[]> {
    return this.httpSvc.listarUsuarios();
  }

  public abrirDialogoEdicion(item: Usuario): Observable<Usuario> {

    const dialogConfig: MatDialogConfig = {
      width: '40rem'
    };

    if (item) {
      const dialogData: UsuarioFormularioDialogData = { usuario: item };
      dialogConfig.data = dialogData;
    }

    const dialog = this.dialog.open(UsuarioFormularioDialogComponent, dialogConfig);

    return from(dialog.afterClosed());
  }

  public onClickBorrar(usr: Usuario) {
    this.ocupadoSource.next(true);
    this.httpSvc.borrarUsuario(usr.idUsuario).pipe(
      finalize(() => { this.ocupadoSource.next(false); })
    ).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open('Usuario \'' + usr.nombreCompletoPersona + '\' eliminado.');
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
