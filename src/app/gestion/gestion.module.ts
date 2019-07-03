import { NgModule } from '@angular/core';
import { MatExpansionModule, MatSelectModule, MatSidenavModule, MatTableModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { GestionRoutingModule } from '../../routing/gestion-routing.module';
import { ClientesComponent } from './mantenedores/clientes/clientes.component';
import { ClienteFormularioComponent } from './mantenedores/clientes/formulario/formulario.component';
import { ClientesListadoComponent } from './mantenedores/clientes/listado/listado.component';
import { EmpleadosComponent } from './mantenedores/empleados/empleados.component';
import { EmpleadoFormularioComponent } from './mantenedores/empleados/formulario/formulario.component';
import { EmpleadosListadoComponent } from './mantenedores/empleados/listado/listado.component';
import { ProductosComponent } from './mantenedores/productos/productos.component';
import { GestionNavegadorComponent } from './navegador/gestion.component';
import { ProductosListadoComponent } from './mantenedores/productos/listado/listado.component';
import { ProductoFormularioComponent } from './mantenedores/productos/formulario/formulario.component';
import { ProveedoresComponent } from './mantenedores/proveedores/proveedores.component';
import { ProveedoresListadoComponent } from './mantenedores/proveedores/listado/listado.component';
import { ProveedorFormularioComponent } from './mantenedores/proveedores/formulario/formulario.component';
import { VentasComponent } from './mantenedores/ventas/ventas.component';
import { VentasListadoComponent } from './mantenedores/ventas/listado/listado.component';
import { VentaFormularioComponent } from './mantenedores/ventas/formulario/formulario.component';
import { AgregarProductoVentaComponent } from './dialogos/agregar-producto/agregar-producto.component';
import { UsuariosComponent } from './mantenedores/usuarios/usuarios.component';
import { UsuariosListadoComponent } from './mantenedores/usuarios/listado/listado.component';
import { UsuarioFormularioComponent } from './mantenedores/usuarios/formulario/formulario.component';
import { OrdenesCompraComponent } from './mantenedores/ordenes_compra/ordenes_compra.component';
import { OrdenesCompraListadoComponent } from './mantenedores/ordenes_compra/listado/listado.component';
import { OrdenCompraFormularioComponent } from './mantenedores/ordenes_compra/formulario/formulario.component';
import { CommonAssetsModule } from 'src/app/compartido/common.module';



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
