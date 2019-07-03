import { Component, OnInit, OnDestroy } from '@angular/core';
import { FERME_GESTION_ROUTES, FERME_AUTHORIZED_CARGOS } from '../../../routing/gestion.routes';
import { AuthService } from 'src/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthHttpService } from 'src/http-services/auth.service';
import { Sesion } from 'src/modelo/Sesion';
    
export interface NavegadorModuloItem {
  path: string;
  texto: string;
  icono: string;
}

export const MODULOS_ICONOS = {
  clientes: "person",
  empleados: "work",
  productos: "store",
  proveedores: "rv_hookup",
  ventas: "attach_money",
  ordenes_compra: "assignment",
  usuarios: "perm_identity"
}

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionNavegadorComponent implements OnInit {

  public modulos: NavegadorModuloItem[];
  public mensajeBienvenida: string;
  public sidenavOpened: boolean = true;


  constructor(
    private authSvc: AuthService,
    private auttHttpSvc: AuthHttpService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { 
    this.mensajeBienvenida = "Conectado como: Invitado";
  }

  ngOnInit() {
    this.modulos = this.generarListadoModulos();
  }

  public puedeVerModulo(nombreModulo: string): boolean {
    
    const sesionActual = this.authSvc.sesion;
    const cargosAutorizados: number[] = FERME_AUTHORIZED_CARGOS[nombreModulo];
    if (cargosAutorizados && sesionActual) {
        const puede = cargosAutorizados.includes(sesionActual.idCargo);
        console.log(nombreModulo +": "+puede);
        return puede;
    }
    console.log(nombreModulo +": false");
    return false;
  }

  private generarListadoModulos(): NavegadorModuloItem[] {
    let protoModulos: NavegadorModuloItem[] = FERME_GESTION_ROUTES.filter(
      (route) => {
        return this.puedeVerModulo(route.path);
      }
    ).map(
      (route) => {
        const protoModulo: NavegadorModuloItem = {
          path: route.path,
          texto: this.routePathToText(route.path),
          icono: MODULOS_ICONOS[route.path]
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

  public onClickToggleSidebar(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }

  public onClickCerrarSesion(): void {
    this.auttHttpSvc.cerrarSesion(this.authSvc.sesion).subscribe(
      () => {
        this.authSvc.sesion = null;
        this.snackBar.open("Su sesión ha sido cerrada.");
        this.router.navigateByUrl("/login");
      },
      err => {
        this.snackBar.open("Hubo un error de comunicación con el servidor.");
      }
    );
  }

}
