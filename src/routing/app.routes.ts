import { Routes } from '@angular/router';
import { LandingComponent } from '../app/landing/landing.component';
import { CompraDashboardComponent } from '../app/compra/dashboard/dashboard.component';

export const FERME_ROUTES: Routes = [
    { path: "", redirectTo: "inicio", pathMatch: "full" },
    { path: "", redirectTo: "landing", pathMatch: "full" },
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "inicio", component: LandingComponent },
    { path: "compra", component: CompraDashboardComponent }
  ];