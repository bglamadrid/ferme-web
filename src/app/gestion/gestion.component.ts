import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { GESTION_ROUTES } from 'src/app/gestion/gestion.routes';
import { ConfirmationDialogComponent, ConfirmationDialogData } from 'src/app/shared/confirmation-dialog/confirmacion.component';
import { PerfilUsuarioFormDialogComponent, PerfilUsuarioFormDialogData } from 'src/app/shared/perfil-usuario-form-dialog/perfil-usuario-form-dialog.component';
import { AuthDataService } from 'src/data/auth.data.iservice';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';
import { GestionService } from './gestion.service';

export interface NavegadorModuloItem {
  path: string;
  texto: string;
  icono: string;
  activo: boolean;
}

export interface ItemListaEnlaceMetadata {
  titulo: string;
  codigoMaterialIcon: string;
}

export const META_MODULOS: { [key: string]: ItemListaEnlaceMetadata } = {
  resumen: {
    titulo: 'Resumen',
    codigoMaterialIcon: 'home'
  },
  clientes: {
    titulo: 'Clientes',
    codigoMaterialIcon: 'person'
  },
  empleados: {
    titulo: 'Empleados',
    codigoMaterialIcon: 'work'
  },
  productos: {
    titulo: 'Productos',
    codigoMaterialIcon: 'store'
  },
  proveedores: {
    titulo: 'Proveedores',
    codigoMaterialIcon: 'rv_hookup'
  },
  ventas: {
    titulo: 'Ventas',
    codigoMaterialIcon: 'attach_money'
  },
  ordenes_compra: {
    titulo: 'Ords. Compra',
    codigoMaterialIcon: 'assignment'
  },
  usuarios: {
    titulo: 'Usuarios',
    codigoMaterialIcon: 'perm_identity'
  }
};

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent
  implements OnInit, OnDestroy {

  protected suscrCambioSesion: Subscription;

  public isSidenavOpen$: Observable<boolean>;
  public modulos: NavegadorModuloItem[];
  public nombreModulo: string;

  public get nombreUsuario(): string { return this.authService.sesion.nombreUsuario; }

  constructor(
    @Inject(DATA_SERVICE_ALIASES.auth) protected authDataService: AuthDataService,
    protected service: GestionService,
    protected authService: AuthService,
    protected router: Router,
    protected snackBarService: MatSnackBar,
    protected dialogService: MatDialog
  ) {
    this.nombreModulo = '';
  }

  ngOnInit(): void {
    this.isSidenavOpen$ = this.service.isSidenavOpen$.pipe();
    this.suscrCambioSesion = this.authService.cambioSesion$.subscribe(() => { this.alCambiarSesion(); });

    this.modulos = this.generarListadoModulos();
  }

  ngOnDestroy(): void {
    if (this.suscrCambioSesion) {
      this.suscrCambioSesion.unsubscribe();
    }
  }

  protected alCambiarSesion(): void {
    if (!this.authService.sesion) {
      this.router.navigateByUrl('/login');
    }
  }

  protected generarListadoModulos(): NavegadorModuloItem[] {

    return GESTION_ROUTES.filter(
      route => this.authService.puedeVerModulo(route.path)
    ).map(
      (route) => {
        const meta = META_MODULOS[route.path];
        const protoModulo: NavegadorModuloItem = {
          path: route.path,
          texto: meta.titulo,
          icono: meta.codigoMaterialIcon,
          activo: false
        };
        return protoModulo;
      }
    );
  }

  protected solicitarConfirmacionCerrarSesion(): Observable<boolean> {
    const dialogData: ConfirmationDialogData = {
      titulo: '¿Cerrar sesion?',
      mensaje: 'Si esta realizando una transaccion, perdera la informacion que no haya guardado.'
    };

    return this.dialogService.open(
      ConfirmationDialogComponent,
      {
        width: '24rem',
        data: dialogData
      }
    ).afterClosed();
  }

  public onClickNavegar(indice: number) {
    const item = this.modulos[indice];
    this.modulos.forEach(m => m.activo = false);
    this.nombreModulo = item.texto;
    item.activo = true;
  }

  public onClickEditarUsuario(): void {
    const sesion = this.authService.sesion;
    this.authDataService.obtenerDatosPersonaSesion(sesion).subscribe(
      perfil => {
        const dialogData: PerfilUsuarioFormDialogData = { persona: perfil };
        const dConf = {
          width: '40rem',
          data: dialogData
        };
        this.dialogService.open(PerfilUsuarioFormDialogComponent, dConf);
      },
      err => {
        this.snackBarService.open('No se pudieron obtener los datos de su perfil. Por favor, vuelva a intentarlo.', 'OK', { duration: -1 });
      }
    );
  }

  public onClickCerrarSesion(): void {
    const mensajeConfirmacion = 'Su sesión ha sido cerrada';
    if (this.authService.sesion) {
      this.solicitarConfirmacionCerrarSesion().subscribe(
        confirmado => {
          if (confirmado) {
            this.authDataService.cerrarSesion(this.authService.sesion).subscribe(
              () => {
                this.authService.sesion = null;
                this.router.navigateByUrl('/login');
                this.snackBarService.open(mensajeConfirmacion);
              },
              err => {
                this.snackBarService.open('Su sesión no pudo ser cerrada. Por favor, vuelva a intentarlo.', 'OK', { duration: -1 });
              }
            );
          }
        }
      );
    } else {
      this.snackBarService.open(mensajeConfirmacion);
      this.router.navigateByUrl('/login');
    }
  }
}
