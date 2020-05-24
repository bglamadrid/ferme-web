import { Component, OnInit, OnDestroy } from '@angular/core';
import { FERME_GESTION_ROUTES, FERME_AUTHORIZED_CARGOS } from 'src/routing/gestion.routes';
import { AuthService } from 'src/services/auth.service';
import { Router, ActivatedRoute, Event } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthHttpService } from 'src/http-services/auth-http.service';
import { Subscription, Observable } from 'rxjs';
import { ConfirmacionDialogComponent, ConfirmationDialogData } from 'src/app/dialogos/confirmacion/confirmacion.component';
import { DatosUsuarioDialogComponent, DatosUsuarioDialogData } from 'src/app/dialogos/datos-usuario/datos-usuario.component';

export interface NavegadorModuloItem {
  path: string;
  texto: string;
  icono: string;
  activo: boolean;
}

export interface ItemListaEnlaceMetadata {
  codigoMaterialIcon: string;
}

export const MODULOS_ICONOS: { [key: string]: ItemListaEnlaceMetadata } = {
  resumen: {
    codigoMaterialIcon: 'home'
  },
  clientes: {
    codigoMaterialIcon: 'person'
  },
  empleados: {
    codigoMaterialIcon: 'work'
  },
  productos: {
    codigoMaterialIcon: 'store'
  },
  proveedores: {
    codigoMaterialIcon: 'rv_hookup'
  },
  ventas: {
    codigoMaterialIcon: 'attach_money'
  },
  ordenes_compra: {
    codigoMaterialIcon: 'assignment'
  },
  usuarios: {
    codigoMaterialIcon: 'perm_identity'
  }
};

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['../../compartido/navegadores.css']
})
export class GestionNavegadorComponent implements OnInit, OnDestroy {

  protected suscrCambioSesion: Subscription;

  public modulos: NavegadorModuloItem[];
  public sidenavOpened = true;
  public nombreModulo: string;

  constructor(
    protected authSvc: AuthService,
    protected auttHttpSvc: AuthHttpService,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected route: ActivatedRoute,
    protected dialog: MatDialog
  ) {
    this.nombreModulo = '';
  }

  public get nombreUsuario(): string { return this.authSvc.sesion.nombreUsuario; }

  ngOnInit(): void {
    this.suscrCambioSesion = this.authSvc.cambioSesion.subscribe(() => { this.alCambiarSesion(); });

    this.modulos = this.generarListadoModulos();

    const rutaActual = this.route.firstChild;
    if (rutaActual) {
      const moduloRuta = rutaActual.routeConfig.path;
      const moduloIndex = this.modulos.findIndex(m => m.path === moduloRuta);
      const modulo = this.modulos[moduloIndex];
      this.onClickNavegar(moduloIndex);
      this.router.navigate([modulo.path], { relativeTo: this.route });
    }
  }

  ngOnDestroy(): void {
    if (this.suscrCambioSesion) {
      this.suscrCambioSesion.unsubscribe();
    }
  }

  protected alCambiarSesion(): void {
    if (!this.authSvc.sesion) {
      this.router.navigateByUrl('/login');
    }
  }

  public onClickNavegar(indice: number) {
    const item = this.modulos[indice];
    this.modulos.forEach(m => m.activo = false);
    this.nombreModulo = item.texto;
    item.activo = true;
  }

  public puedeVerModulo(nombreModulo: string): boolean {

    const sesionActual = this.authSvc.sesion;
    const cargosAutorizados = FERME_AUTHORIZED_CARGOS[nombreModulo];
    if (cargosAutorizados && sesionActual) {
      const puede = cargosAutorizados.includes(sesionActual.idCargo);
      return puede;
    }
    return false;
  }

  protected generarListadoModulos(): NavegadorModuloItem[] {

    return FERME_GESTION_ROUTES.filter(
      route => this.puedeVerModulo(route.path)
    ).map(
      (route) => {
        const metadatos = MODULOS_ICONOS[route.path];
        const protoModulo: NavegadorModuloItem = {
          path: route.path,
          texto: this.routePathToText(route.path),
          icono: metadatos.codigoMaterialIcon,
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

    return this.dialog.open(
      ConfirmacionDialogComponent,
      {
        width: '24rem',
        data: dialogData
      }
    ).afterClosed();
  }

  /** Convierte el identificador o ruta (URL) de tipo en un string de encabezado.
   * Separa el string por guiones bajos, deja la primera letra de cada palabra separada en mayúscula, y las vuelve a unir con espacios.
   * Ej: modulo_de_aplicacion = Modulo De Aplicacion
   * @param path La ruta (URL) del modulo
   */
  public routePathToText(path: string): string {
    return path.split('_').map((palabra) => palabra.charAt(0).toUpperCase() + palabra.substring(1)).join(' ');
  }

  public onClickEditarUsuario(): void {
    const sesion = this.authSvc.sesion;
    this.auttHttpSvc.obtenerDatosPersonaSesion(sesion).subscribe(
      perfil => {
        const dialogData: DatosUsuarioDialogData = { persona: perfil };
        const dConf = {
          width: '40rem',
          data: dialogData
        };
        this.dialog.open(DatosUsuarioDialogComponent, dConf);
      },
      err => {
        this.snackBar.open('No se pudieron obtener los datos de su perfil. Por favor, vuelva a intentarlo.', 'OK', { duration: -1 });
      }
    );
  }

  public onClickCerrarSesion(): void {
    const mensajeConfirmacion = 'Su sesión ha sido cerrada';
    if (this.authSvc.sesion) {
      this.solicitarConfirmacionCerrarSesion().subscribe(
        confirmado => {
          if (confirmado) {
            this.auttHttpSvc.cerrarSesion(this.authSvc.sesion).subscribe(
              () => {
                this.authSvc.Sesion = null;
                this.router.navigateByUrl('/login');
                this.snackBar.open(mensajeConfirmacion);
              },
              err => {
                this.snackBar.open('Su sesión no pudo ser cerrada. Por favor, vuelva a intentarlo.', 'OK', { duration: -1 });
              }
            );
          }
        }
      );
    } else {
      this.snackBar.open(mensajeConfirmacion);
      this.router.navigateByUrl('/login');
    }
  }
}
