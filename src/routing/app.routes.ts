import { Routes } from '@angular/router';
import { LandingComponent } from '../app/landing/landing.component';
import { CompraDashboardComponent } from '../app/compra/dashboard/dashboard.component';
import { LoginComponent } from 'src/app/login/login.component';

export const FERME_ROUTES: Routes = [
    { path: "", redirectTo: "inicio", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "inicio", component: LandingComponent },
    { path: "compra", component: CompraDashboardComponent }
  ];