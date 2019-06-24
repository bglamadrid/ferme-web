import { Routes } from '@angular/router';
import { LandingComponent } from '../app/landing/landing.component';
import { CompraDashboardComponent } from '../app/compra/dashboard/dashboard.component';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthGuard } from './auth.guard';

export const FERME_ROUTES: Routes = [
    { path: "", redirectTo: "inicio", pathMatch: "full" },
    { path: "login", component: LoginComponent, canActivate: [AuthGuard] },
    { path: "inicio", component: LandingComponent, canActivate: [AuthGuard] },
    { path: "compra", component: CompraDashboardComponent, canActivate: [AuthGuard] }
  ];