import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FERME_COMPRA_ROUTES } from './compra.routes';
import { CompraNavegadorComponent } from 'src/app/compra/navegador/compra.component';


@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'compra', component: CompraNavegadorComponent,
        children: FERME_COMPRA_ROUTES,
        canActivate: [],
        canActivateChild: []
    }
  ])],
  exports: [RouterModule]
})
export class CompraRoutingModule {

}
