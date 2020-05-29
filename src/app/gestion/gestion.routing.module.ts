import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FERME_GESTION_ROUTES } from './gestion.routes';
import { GestionComponent } from './gestion.component';
import { AuthGuard } from '../auth.guard';


@NgModule({
  imports: [RouterModule.forChild([
    { path: 'gestion', component: GestionComponent,
        children: FERME_GESTION_ROUTES,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    }
  ])],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
