import { NgModule } from '@angular/core';
import { GestionRoutingModule } from '../../routing/gestion-routing.module';
import { MatSidenavModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatTableModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatExpansionModule } from '@angular/material';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteFormularioComponent } from './clientes/formulario/formulario.component';
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
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProveedoresListadoComponent } from './proveedores/listado/listado.component';
import { ProveedorFormularioComponent } from './proveedores/formulario/formulario.component';
import { VentaFormularioComponent } from './ventas/formulario/formulario.component';
import { VentasComponent } from './ventas/ventas.component';
import { VentasListadoComponent } from './ventas/listado/listado.component';
import { AgregarProductoVentaComponent } from './common/agregar-producto/agregar-producto.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosListadoComponent } from './usuarios/listado/listado.component';
import { UsuarioFormularioComponent } from './usuarios/formulario/formulario.component';
import { OrdenesCompraComponent } from './ordenes_compra/ordenes_compra.component';
import { OrdenesCompraListadoComponent } from './ordenes_compra/listado/listado.component';
import { OrdenCompraFormularioComponent } from './ordenes_compra/formulario/formulario.component';


const SNACKBAR_DEFAULTS = {
  duration: 3000
};

@NgModule({
  declarations: [
    GestionNavegadorComponent,
    ClientesComponent,
    ClienteFormularioComponent,
    ClientesListadoComponent,
    EmpleadosComponent,
    EmpleadoFormularioComponent,
    EmpleadosListadoComponent,
    ProductosComponent,
    ProductosListadoComponent,
    ProductoFormularioComponent,
    ProveedoresComponent,
    ProveedoresListadoComponent,
    ProveedorFormularioComponent,
    VentasComponent,
    VentasListadoComponent,
    VentaFormularioComponent,
    AgregarProductoVentaComponent,
    UsuariosComponent,
    UsuariosListadoComponent,
    UsuarioFormularioComponent,
    OrdenesCompraComponent,
    OrdenesCompraListadoComponent,
    OrdenCompraFormularioComponent
  ],
  imports: [
    CommonAssetsModule,
    GestionRoutingModule,
    MatSidenavModule,
    MatTableModule,
    MatSelectModule,
    MatExpansionModule
  ],
  entryComponents: [
    EmpleadoFormularioComponent,
    ProductoFormularioComponent,
    ProveedorFormularioComponent,
    VentaFormularioComponent,
    AgregarProductoVentaComponent,
    UsuarioFormularioComponent,
    OrdenCompraFormularioComponent
  ], 
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: SNACKBAR_DEFAULTS}
  ]
})
export class GestionModule { }
