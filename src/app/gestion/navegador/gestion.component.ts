import { Component, OnInit, OnDestroy } from '@angular/core';
import { FERME_GESTION_ROUTES, FERME_AUTHORIZED_CARGOS } from '../../../routing/gestion.routes';
import { AuthService } from 'src/services/auth.service';
import { Router, ActivatedRoute, Event } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthHttpService } from 'src/http-services/auth.service';
import { Sesion } from 'src/modelo/Sesion';
import { Subscription, Observable, Subject, BehaviorSubject } from 'rxjs';
    
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
  clientes: { 
    codigoMaterialIcon: "person" 
  },
  empleados: {
    codigoMaterialIcon: "work"
  },
  productos: {
    codigoMaterialIcon: "store"
  },
  proveedores: {
    codigoMaterialIcon: "rv_hookup"
  },
  ventas: {
    codigoMaterialIcon: "attach_money"
  },
  ordenes_compra: {
    codigoMaterialIcon: "assignment"
  },
  usuarios: {
    codigoMaterialIcon: "perm_identity"
  }
}

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionNavegadorComponent implements OnInit, OnDestroy {

  protected _nombreModulo$: Subject<string>;
  protected _nombreUsuario$: Subject<string>;
  protected _suscrCambioSesion: Subscription;

  public modulos: NavegadorModuloItem[];
  public sidenavOpened: boolean = true;
  public nombreModulo$: Observable<string>;
  public nombreUsuario$: Observable<string>;

  constructor(
    protected authSvc: AuthService,
    protected auttHttpSvc: AuthHttpService,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected route : ActivatedRoute
  ) { 
    this._nombreModulo$ = new BehaviorSubject<string>("Inicio"); // puede ser un subject si se quiere implementar de otra manera
    this._nombreUsuario$ = new BehaviorSubject<string>(this.usuarioNombre); // puede ser un subject si se quiere implementar de otra manera

    this.nombreModulo$ = this._nombreModulo$.asObservable();
    this.nombreUsuario$ = this._nombreUsuario$.asObservable();
  }

  protected get usuarioNombre(): string { return this.authSvc.sesion.nombreUsuario; }

  ngOnInit(): void {
    this._suscrCambioSesion = this.authSvc.cambioSesion.subscribe(() => { this.alCambiarSesion(); });

    this.modulos = this.generarListadoModulos();
    
    const rutaActual = this.route.firstChild;
    if (rutaActual) {
      const moduloRuta: string = rutaActual.routeConfig.path;
      const moduloIndex: number = this.modulos.findIndex(m => m.path === moduloRuta);
      const modulo = this.modulos[moduloIndex];
      this.onClickNavegar(moduloIndex);
      this.router.navigate([modulo.path], {relativeTo: this.route});
    }
  }

  ngOnDestroy(): void {
    if (this._suscrCambioSesion) {
      this._suscrCambioSesion.unsubscribe();
    }
  }

  protected alCambiarSesion(): void {
    if (!this.authSvc.sesion) {
      this.router.navigateByUrl("/login");
    }
  }

  public onClickNavegar(indice: number) {
    const item: NavegadorModuloItem = this.modulos[indice];
    this.modulos.forEach(m => m.activo = false);
    this._nombreModulo$.next(item.texto);
    item.activo = true;
  }

  public puedeVerModulo(nombreModulo: string): boolean {
    
    const sesionActual = this.authSvc.sesion;
    const cargosAutorizados: number[] = FERME_AUTHORIZED_CARGOS[nombreModulo];
    if (cargosAutorizados && sesionActual) {
        const puede = cargosAutorizados.includes(sesionActual.idCargo);
        return puede;
    }
    return false;
  }

  protected generarListadoModulos(): NavegadorModuloItem[] {
    let protoModulos: NavegadorModuloItem[] = FERME_GESTION_ROUTES.filter(
      (route) => {
        return this.puedeVerModulo(route.path);
      }
    ).map(
      (route) => {
        const metadatos: ItemListaEnlaceMetadata = MODULOS_ICONOS[route.path];
        const protoModulo: NavegadorModuloItem = {
          path: route.path,
          texto: this.routePathToText(route.path),
          icono: metadatos.codigoMaterialIcon,
          activo: false
        };
        return protoModulo;
      }
    );

    return protoModulos;
  }

  /**
   * Separa el string por guiones bajos, deja la primera letra de cada palabra separada en mayúscula, y las vuelve a unir con espacios.
   * @param path 
   */
  public routePathToText(path: string): string {
    return path.split("_").map((palabra) => { return palabra.charAt(0).toUpperCase()+palabra.substring(1); }).join(" ");
  }

  public onClickCerrarSesion(): void {
    if (this.authSvc.sesion) {
      this.auttHttpSvc.cerrarSesion(this.authSvc.sesion).subscribe(
        () => {
          this.authSvc.sesion = null;
          this.router.navigateByUrl("/login");
          this.snackBar.open("Su sesión ha sido cerrada.");
        },
        err => {
          this.snackBar.open("Hubo un error de comunicación con el servidor.");
        }
      );
    } else {
      this.snackBar.open("Su sesión ha sido cerrada.");
      this.router.navigateByUrl("/login");
    }
  }

}
