import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';
import { FERME_ROUTES } from './app.routes';

@NgModule({
  imports: [
    RouterModule.forRoot(
      FERME_ROUTES,
      {
        preloadingStrategy: SelectivePreloadingStrategyService
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
