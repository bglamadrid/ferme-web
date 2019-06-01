import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { LandingComponent } from './landing/landing.component';
import { CompraDashboardComponent as CompraComponent } from './compra/dashboard/dashboard.component';
import { GestionDashboardComponent as GestionComponent } from './gestion/dashboard/dashboard.component';
import { LoginComponent } from './gestion/login/login.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenav, MatTableModule } from '@angular/material';
import { ClientesComponent } from './gestion/clientes/clientes.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    CompraComponent,
    GestionComponent,
    SidebarComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  providers: [AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
