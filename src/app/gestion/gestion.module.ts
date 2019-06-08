import { NgModule } from '@angular/core';
import { GestionRoutingModule } from './gestion-routing.module';
import { LoginComponent } from './login/login.component';
import { MatSidenavModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatTableModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';
import { ClientesComponent } from './clientes/clientes.component';
import { ClientesFormularioComponent } from './clientes/formulario/formulario.component';
import { ClientesListadoComponent } from './clientes/listado/listado.component';
import { GestionNavegadorComponent } from './gestion.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { EmpleadoFormularioComponent } from './empleados/formulario/formulario.component';
import { EmpleadosListadoComponent } from './empleados/listado/listado.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductosComponent } from './productos/productos.component';
import { ProductosListadoComponent } from './productos/listado/listado.component';
import { ProductoFormularioComponent } from './productos/formulario/formulario.component';
import { CommonAssetsModule } from 'src/assets/common/common.module';


@NgModule({
  declarations: [
    LoginComponent,
    GestionNavegadorComponent,
    ClientesComponent,
    ClientesFormularioComponent,
    ClientesListadoComponent,
    EmpleadosComponent,
    EmpleadoFormularioComponent,
    EmpleadosListadoComponent,
    ProductosComponent,
    ProductosListadoComponent,
    ProductoFormularioComponent,
  ],
  imports: [
    CommonAssetsModule,
    GestionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  entryComponents: [
    EmpleadoFormularioComponent,
    ProductoFormularioComponent
  ], 
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}}
  ]
})
export class GestionModule { }
