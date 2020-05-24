import { Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { Sesion } from 'src/modelo/Sesion';
import { FERME_AUTHORIZED_CARGOS } from './gestion.routes';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CargosEnum } from 'src/enums/CargosEnum';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  public path: ActivatedRouteSnapshot[];
  public route: ActivatedRouteSnapshot;

  constructor(
    protected router: Router,
    protected authSvc: AuthService
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!route.parent) {
      return true;
    } else {
      const modulos: string[] = state.url.substr(1).split('/');
      const mainModule: string = modulos[0];
      const sesionActual: Sesion = this.authSvc.sesion;
      if (mainModule === 'gestion') {
        if (sesionActual) {
          const isSesionValida = this.authSvc.isSesionValida(sesionActual);
          if (isSesionValida) {
            if (modulos.length > 1) {
              const idCargo = sesionActual.idCargo;
              const subModule = modulos[1];
              const cargosAutorizados = FERME_AUTHORIZED_CARGOS[subModule];

              if (cargosAutorizados) {
                return cargosAutorizados.includes(idCargo);
              }
            }
            return true;
          }
        }
        this.router.navigateByUrl('/login');
        return false;

      } else if (mainModule === 'inicio') {
        return true;
      } else if (mainModule === 'login') {
        if (sesionActual) {
          return !this.authSvc.isSesionValida(sesionActual);
        }
        return true;
      }
      return false;

    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(route, state);
  }
}
