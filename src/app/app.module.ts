import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { LandingComponent } from './landing/landing.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatSidenavModule, MatListModule, MatCardModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GestionModule } from './gestion/gestion.module';
import { CompraDashboardComponent } from './compra/dashboard/dashboard.component';
import { Router } from '@angular/router';

const DEBUG_MODE: boolean = false;

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    CompraDashboardComponent
  ],
  imports: [
    GestionModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule
  ],
  providers: [AppRoutingModule],
  bootstrap: [AppComponent]
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
