import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FERME_GESTION_ROUTES } from './gestion.routes';
    
export interface NavegadorModuloItem {
  path: string;
  texto: string;
}

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionNavegadorComponent implements OnInit, OnDestroy {

  public modulos: NavegadorModuloItem[];

  private routerParamsSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.routerParamsSub = this.route.params.subscribe((params) => {
      console.log(this.route);
    });
  }

  ngOnInit() {
    this.modulos = this.generarListadoModulos();
  }

  ngOnDestroy() {
    if (this.routerParamsSub) {
      this.routerParamsSub.unsubscribe();
    }
  }

  private generarListadoModulos() {
    let protoModulos: NavegadorModuloItem[] = FERME_GESTION_ROUTES.map((route) => {
      const protoModulo: NavegadorModuloItem = {
        path: route.path,
        texto: undefined
      };
      return protoModulo;
    });

    protoModulos.forEach((route) => {
      route.texto = this.routePathToText(route.path);
    });
    return protoModulos;
  }

  /**
   * Separa el string por guiones bajos, deja la primera letra de cada palabra separada en mayúscula, y las vuelve a unir con espacios.
   * @param path 
   */
  public routePathToText(path: string): string {
    return path.split("_").map((palabra) => { return palabra.charAt(0).toUpperCase()+palabra.substring(1); }).join(" ");
  }

}