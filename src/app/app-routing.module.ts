import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { InicioComponent as GestionComponent } from './gestion/inicio/inicio.component';
import { InicioComponent as CompraComponent } from './compra/inicio/inicio.component';

const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "gestion", component: GestionComponent },
  { path: "compra", component: CompraComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 



}
