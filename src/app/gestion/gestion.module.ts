import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GestionRoutingModule } from './gestion-routing.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule, MatTableModule, MatSidenavModule, MatListModule } from '@angular/material';
import { ClientesComponent } from './clientes/clientes.component';
import { ClientesFormularioComponent } from './clientes/formulario/formulario.component';
import { ClientesListadoComponent } from './clientes/listado/listado.component';
import { GestionNavegadorComponent } from './gestion.component';


@NgModule({
  declarations: [
    LoginComponent,
    GestionNavegadorComponent,
    ClientesComponent,
    ClientesFormularioComponent,
    ClientesListadoComponent
  ],
  imports: [
    GestionRoutingModule,
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class GestionModule { }
