import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { AppRoutingModule } from 'src/routing/app-routing.module';
import { AuthGuard } from 'src/routing/auth.guard';

import { FermeCompartidoModule } from './compartido/common.module';
import { GestionModule } from './gestion/gestion.module';


import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { CompraModule } from './compra/compra.module';

const DEBUG_ROUTES: boolean = false;

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent
  ],
  imports: [
    FermeCompartidoModule,
    AppRoutingModule,
    GestionModule,
    CompraModule
  ],
  providers: [
    AppRoutingModule,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { 

  constructor(router: Router) {
    if (DEBUG_ROUTES) {
      this.inspectRouterConfiguration(router);
    }
  }

  // Diagnostic only
  protected inspectRouterConfiguration(router: Router) {
    // Use a custom replacer to display function names in the route configs
    const replacer = (key: any, value: any) => (typeof value === 'function') ? value.name : value;
    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
