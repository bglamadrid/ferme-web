import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { GestionDashboardComponent as GestionComponent } from './gestion/dashboard/dashboard.component';
import { CompraDashboardComponent as CompraComponent } from './compra/dashboard/dashboard.component';

const routes: Routes = [
  { path: "", redirectTo: "landing", pathMatch: "full" },
  { path: "landing", component: LandingComponent },
  { path: "gestion", component: GestionComponent },
  { path: "compra", component: CompraComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 



}
