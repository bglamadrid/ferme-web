import { NgModule } from '@angular/core';
import { MatSnackBarConfig, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { FermeCompartidoModule } from 'src/app/compartido/common.module';
import { GestionRoutingModule } from 'src/routing/gestion-routing.module';
import { AgregarProductoDialogComponent } from './dialogos/agregar-producto/agregar-producto.component';
import { ClienteFormularioDialogComponent } from './dialogos/formulario-cliente/formulario-cliente.component';
import { EmpleadoFormularioDialogComponent } from './dialogos/formulario-empleado/formulario-empleado.component';
import { OrdenCompraFormularioDialogComponent } from './dialogos/formulario-orden-compra/formulario-orden-compra.component';
import { ProductoFormularioDialogComponent } from './dialogos/formulario-producto/formulario-producto.component';
import { ProveedorFormularioDialogComponent } from './dialogos/formulario-proveedor/formulario-proveedor.component';
import { UsuarioFormularioDialogComponent } from './dialogos/formulario-usuario/formulario-usuario.component';
import { VentaFormularioDialogComponent } from './dialogos/formulario-venta/formulario-venta.component';
import { GestionNavegadorComponent } from './navegador/gestion.component';
import { ClientesGestionComponent } from './paginas/clientes/clientes.component';
import { ClientesListadoComponent } from './paginas/clientes/listado/listado.component';
import { GestionEmpleadosComponent } from './paginas/empleados/empleados.component';
import { EmpleadosListadoComponent } from './paginas/empleados/listado/listado.component';
import { OrdenesCompraListadoComponent } from './paginas/ordenes_compra/listado/listado.component';
import { OrdenesCompraGestionComponent } from './paginas/ordenes_compra/ordenes_compra.component';
import { ProductosListadoComponent } from './paginas/productos/listado/listado.component';
import { ProductosGestionComponent } from './paginas/productos/productos.component';
import { ProveedoresListadoComponent } from './paginas/proveedores/listado/listado.component';
import { ProveedoresGestionComponent } from './paginas/proveedores/proveedores.component';
import { ResumenGestionComponent } from './paginas/resumen/resumen.component';
import { UsuariosListadoComponent } from './paginas/usuarios/listado/listado.component';
import { UsuariosGestionComponent } from './paginas/usuarios/usuarios.component';
import { VentasListadoComponent } from './paginas/ventas/listado/listado.component';
import { VentasGestionComponent } from './paginas/ventas/ventas.component';

const SNACKBAR_DEFAULTS: MatSnackBarConfig = {
  duration: 5000
};

@NgModule({
  declarations: [
    GestionNavegadorComponent,
    ClientesGestionComponent,
    ClienteFormularioDialogComponent,
    ClientesListadoComponent,
    GestionEmpleadosComponent,
    EmpleadoFormularioDialogComponent,
    EmpleadosListadoComponent,
    ProductosGestionComponent,
    ProductosListadoComponent,
    ProductoFormularioDialogComponent,
    ProveedoresGestionComponent,
    ProveedoresListadoComponent,
    ProveedorFormularioDialogComponent,
    VentasGestionComponent,
    VentasListadoComponent,
    VentaFormularioDialogComponent,
    AgregarProductoDialogComponent,
    UsuariosGestionComponent,
    UsuariosListadoComponent,
    UsuarioFormularioDialogComponent,
    OrdenesCompraGestionComponent,
    OrdenesCompraListadoComponent,
    OrdenCompraFormularioDialogComponent,
    ResumenGestionComponent
  ],
  imports: [
    FermeCompartidoModule,
    GestionRoutingModule
  ],
  entryComponents: [
    EmpleadoFormularioDialogComponent,
    ProductoFormularioDialogComponent,
    ProveedorFormularioDialogComponent,
    VentaFormularioDialogComponent,
    AgregarProductoDialogComponent,
    UsuarioFormularioDialogComponent,
    OrdenCompraFormularioDialogComponent
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: SNACKBAR_DEFAULTS }
  ]
})
export class GestionModule { }
