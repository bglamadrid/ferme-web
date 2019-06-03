import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { LandingComponent } from './landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatSidenavModule, MatListModule, MatCardModule, MatButtonModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GestionModule } from './gestion/gestion.module';
import { CompraDashboardComponent } from './compra/dashboard/dashboard.component';
import { Router } from '@angular/router';
import { CenteredMatSpinnerComponent } from './common/centered-mat-spinner/centered.component';

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
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule
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
