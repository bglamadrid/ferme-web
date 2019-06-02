import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GestionRoutingModule } from './gestion-routing.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule, MatTableModule, MatSidenavModule, MatListModule, MatButtonModule } from '@angular/material';
import { ClientesComponent } from './clientes/clientes.component';
import { ClientesFormularioComponent } from './clientes/formulario/formulario.component';
import { ClientesListadoComponent } from './clientes/listado/listado.component';
import { GestionNavegadorComponent } from './gestion.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { FormularioComponent } from './empleados/formulario/formulario.component';
import { EmpleadosListadoComponent } from './empleados/listado/listado.component';


@NgModule({
  declarations: [
    LoginComponent,
    GestionNavegadorComponent,
    ClientesComponent,
    ClientesFormularioComponent,
    ClientesListadoComponent,
    EmpleadosComponent,
    FormularioComponent,
    EmpleadosListadoComponent
  ],
  imports: [
    GestionRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule
  ]
})
export class GestionModule { }
