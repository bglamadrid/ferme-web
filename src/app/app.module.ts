import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../routing/app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { GestionModule } from './gestion/gestion.module';
import { CompraDashboardComponent } from './compra/dashboard/dashboard.component';
import { Router } from '@angular/router';
import { CommonAssetsModule } from 'src/assets/common/common.module';
import { MatSidenavModule } from '@angular/material';

const DEBUG_MODE: boolean = false;

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    CompraDashboardComponent
  ],
  imports: [
    CommonAssetsModule,
    GestionModule,
    AppRoutingModule,
    MatSidenavModule
  ],
  providers: [
    AppRoutingModule
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
    const replacer = (key, value) => (typeof value === 'function') ? value.name : value;
    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
