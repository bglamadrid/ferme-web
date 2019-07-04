import { Routes } from '@angular/router';
import { LandingComponent } from 'src/app/landing/landing.component';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthGuard } from './auth.guard';

export const FERME_ROUTES: Routes = [
    { path: "", redirectTo: "inicio", pathMatch: "full" },
    { path: "inicio", component: LandingComponent, canActivate: [] },
    { path: "login", redirectTo: "ingresar", canActivate: [] },
    { path: "ingresar", component: LoginComponent, canActivate: [] },
  ];