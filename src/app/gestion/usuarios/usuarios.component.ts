import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Usuario } from 'src/models/Usuario';
import { UsuariosListadoComponent } from './listado/listado.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UsuarioFormularioComponent, UsuarioFormularioDialogData } from './formulario/formulario.component';
import { UsuariosHttpService } from 'src/http-services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: [
    '../gestion-pages.css'
  ]
})
export class UsuariosComponent implements OnInit {

  public usuarios$: Observable<Usuario[]>;
  public loading$: Observable<boolean>;
  public busy$: Observable<boolean>;

  @ViewChild("listado") public listado: UsuariosListadoComponent;
  
  constructor(
    private httpSvc: UsuariosHttpService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { 
    this.loading$ = of(true);
    this.busy$ = of(true);
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  private cargarUsuarios(): Observable<Usuario[]> {
    this.loading$ = of(true);
    let usuarios: Observable<Usuario[]> = this.httpSvc.listarUsuarios();
    usuarios.subscribe((payload: Usuario[]) => {
      this.usuarios$ = of(payload);
    }, err => {
      console.log(err);
      this.usuarios$ = of([]);
    }, () => {
      this.loading$ = of(false);
      this.busy$ = of(false);
    });
    return from(usuarios);
  }

  public onClickAgregarUsuario(): void {
    this.busy$ = of(true);
    this.dialog.open(UsuarioFormularioComponent, {
      width: "40rem",
      height: "25rem"
    }).afterClosed().subscribe(
      (nuevo: Usuario) => {
        if (nuevo) {
          this.cargarUsuarios();
        }
      },
      err => { console.log(err); },
      () => { this.busy$ = of(false); }
    );
  }

  public onClickEditarUsuario(usr: Usuario): void {
    this.busy$ = of(true);
    const dialogData: UsuarioFormularioDialogData = {
      usuario: usr
    };

    this.dialog.open(UsuarioFormularioComponent, {
      width: "40rem",
      height: "25rem",
      data: dialogData
    }).afterClosed().subscribe(
      (editado: Usuario) => {
        if (editado) {
          this.cargarUsuarios();
        }
      },
      err => { console.log(err); },
      () => { this.busy$ = of(false); }
    );
  }

  public onClickBorrarUsuario(usr: Usuario) {
    this.busy$ = of(true);
    this.httpSvc.borrarUsuario(usr.idUsuario).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open("Usuario '"+usr.nombreCompletoPersona+"' eliminado.");
          this.cargarUsuarios();
        } else {
          this.snackBar.open("Hubo un problema al borrar el empleado.");
        }
      },
      err => { 
        this.snackBar.open("Hubo un problema de comunicación con el servidor. Por favor, inténtelo nuevamente.");
        console.log(err);
       },
       () => { this.busy$ = of(false); }
    );
  }

}
