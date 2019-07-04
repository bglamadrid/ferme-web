import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from, Subject } from 'rxjs';
import { Usuario } from 'src/modelo/Usuario';
import { UsuariosListadoComponent } from './listado/listado.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UsuarioFormularioComponent, UsuarioFormularioDialogData } from './formulario/formulario.component';
import { UsuariosHttpService } from 'src/http-services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css'
  ]
})
export class UsuariosComponent implements OnInit {

  protected _usuarios: Usuario[];
  protected _usuariosSource: Subject<Usuario[]>;
  public usuarios$: Observable<Usuario[]>;

  protected _loadingSource: Subject<boolean>;
  public loading$: Observable<boolean>;

  protected _busySource: Subject<boolean>;
  public busy$: Observable<boolean>;

  @ViewChild("listado") public listado: UsuariosListadoComponent;
  
  constructor(
    protected httpSvc: UsuariosHttpService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) { 
    this._usuarios = [];
    this._usuariosSource = new Subject<Usuario[]>();
    this.usuarios$ = this._usuariosSource.asObservable();

    this._loadingSource = new Subject<boolean>();
    this.loading$ = this._loadingSource.asObservable();

    this._busySource = new Subject<boolean>();
    this.busy$ = this._busySource.asObservable();
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  protected cargarUsuarios(): Observable<Usuario[]> {
    this._loadingSource.next(true);
    let usuarios: Observable<Usuario[]> = this.httpSvc.listarUsuarios();
    usuarios.subscribe((payload: Usuario[]) => {
      this._usuarios = payload;
      this._usuariosSource.next(payload);
    }, err => {
      console.log(err);
      this._usuarios = [];
      this._usuariosSource.next([]);
    }, () => {
      this._loadingSource.next(false);
      this._busySource.next(false);
    });
    return from(usuarios);
  }

  public onClickAgregar(): void {
    this._busySource.next(true);
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
      () => { this._busySource.next(false); }
    );
  }

  public onClickEditar(usr: Usuario): void {
    this._busySource.next(true);
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
      () => { this._busySource.next(false); }
    );
  }

  public onClickBorrar(usr: Usuario) {
    this._busySource.next(true);
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
       () => { this._busySource.next(false); }
    );
  }

}
