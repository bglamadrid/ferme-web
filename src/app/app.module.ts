import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../routing/app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { GestionModule } from './gestion/gestion.module';
import { CompraDashboardComponent } from './compra/dashboard/dashboard.component';
import { Router } from '@angular/router';
import { CommonAssetsModule } from './compartido/common.module';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/routing/auth.guard';

const DEBUG_MODE: boolean = false;

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    CompraDashboardComponent
  ],
  imports: [
    CommonAssetsModule,
    AppRoutingModule,
    GestionModule
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
    if (DEBUG_MODE) {
      this.inspectRouterConfiguration(router);
    }
  }

  // Diagnostic only
  private inspectRouterConfiguration(router: Router) {
    // Use a custom replacer to display function names in the route configs
    const replacer = (key: any, value: any) => (typeof value === 'function') ? value.name : value;
    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
