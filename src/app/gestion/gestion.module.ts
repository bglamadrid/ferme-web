import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GestionRoutingModule } from './gestion-routing.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule, MatTableModule, MatSidenavModule, MatListModule, MatButtonModule, MatDialogModule, MatSnackBarModule, MatFormFieldModule, MatSelectModule, MatInputModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatIconModule } from '@angular/material';
import { ClientesComponent } from './clientes/clientes.component';
import { ClientesFormularioComponent } from './clientes/formulario/formulario.component';
import { ClientesListadoComponent } from './clientes/listado/listado.component';
import { GestionNavegadorComponent } from './gestion.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { EmpleadoFormularioComponent } from './empleados/formulario/formulario.component';
import { EmpleadosListadoComponent } from './empleados/listado/listado.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    GestionNavegadorComponent,
    ClientesComponent,
    ClientesFormularioComponent,
    ClientesListadoComponent,
    EmpleadosComponent,
    EmpleadoFormularioComponent,
    EmpleadosListadoComponent
  ],
  imports: [
    GestionRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  entryComponents: [
    EmpleadoFormularioComponent
  ], 
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}}
  ]
})
export class GestionModule { }
