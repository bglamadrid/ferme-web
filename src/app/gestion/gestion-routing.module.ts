import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FERME_GESTION_ROUTES } from './gestion.routes';
import { GestionNavegadorComponent } from './gestion.component';

@NgModule({
  imports: [RouterModule.forChild([ 
    { path: "gestion", component: GestionNavegadorComponent, 
        children: FERME_GESTION_ROUTES
    }
  ])],
  exports: [RouterModule]
})
export class GestionRoutingModule { 

}
  