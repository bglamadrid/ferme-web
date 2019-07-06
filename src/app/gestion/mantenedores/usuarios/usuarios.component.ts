import { Component, ViewChild } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Usuario } from 'src/modelo/Usuario';
import { UsuariosListadoComponent } from './listado/listado.component';
import { MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { UsuarioFormularioComponent, UsuarioFormularioDialogData } from './formulario/formulario.component';
import { UsuariosHttpService } from 'src/http-services/usuarios.service';
import { MantenedorGestionComponent } from '../../compartido/mantenedor/mantenedor.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css'
  ]
})
export class MantenedorUsuariosComponent 
  extends MantenedorGestionComponent<Usuario> {

  @ViewChild("listado") public listado: UsuariosListadoComponent;
  
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

    let dialogConfig: MatDialogConfig = {
      width: "40rem",
      height: "25rem"
    };

    if (item) {
      let dialogData: UsuarioFormularioDialogData = { usuario: item };
      dialogConfig.data = dialogData;
    }

    let dialog = this.dialog.open(UsuarioFormularioComponent, dialogConfig)
    
    return from(dialog.afterClosed());
  }

  public onClickBorrar(usr: Usuario) {
    this._ocupado$.next(true);
    this.httpSvc.borrarUsuario(usr.idUsuario).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open("Usuario '"+usr.nombreCompletoPersona+"' eliminado.");
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
