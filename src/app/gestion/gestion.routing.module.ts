import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GESTION_ROUTES } from './gestion.routes';
import { GestionComponent } from './gestion.component';
import { AuthGuard } from '../auth.guard';


@NgModule({
  imports: [RouterModule.forChild([
    { path: 'gestion', component: GestionComponent,
        children: GESTION_ROUTES,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    }
  ])],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
