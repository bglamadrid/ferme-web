import { Usuario } from "src/models/Usuario";
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot, UrlTree, UrlSegment, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { Sesion } from 'src/models/Sesion';
import { FERME_GESTION_ROUTES, FERME_AUTHORIZED_CARGOS } from './gestion.routes';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    public path: ActivatedRouteSnapshot[];
    public route: ActivatedRouteSnapshot;
    constructor(
        private router: Router,
        private authSvc: AuthService
    ) {

    }

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree {
        
        if (!route.parent.parent) {
            return true;
        } else {
            const modulos: string[] = state.url.substr(1).split("/");
            const mainModule: string = modulos[0];
            const sesionActual: Sesion = this.authSvc.sesion;
            if (mainModule === "gestion") {
                if (sesionActual) {
                    const isSesionValida = this.authSvc.isSesionValida(sesionActual);
                    if (isSesionValida) {
                        if (modulos.length > 1) {
                            const subModule: string = modulos[1];
                            const cargosAutorizados: number[] = FERME_AUTHORIZED_CARGOS[subModule];
                            
                            if (cargosAutorizados && cargosAutorizados) {
                                return cargosAutorizados.includes(sesionActual.idCargo);
                            }
                        }
                        return true;
                    }
                }
                this.router.navigateByUrl("/login");
                return false;

            } else if (mainModule === "inicio") {
                return true;
            } else if (mainModule === "login") {
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
    ): Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree {
        return this.canActivate(route, state);
    }
}