import { NgModule } from '@angular/core';
import { MatSnackBarConfig, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { GestionRoutingModule } from 'src/routing/gestion-routing.module';
import { GestionComponent } from './gestion.component';
import { AgregarProductoDialogComponent } from './get-productos-array-dialog/agregar-producto.component';
import { ClienteFormDialogGestionComponent } from './mantenedor-clientes/form-dialog/cliente-form-dialog.component';
import { ListadoClientesGestionComponent } from './mantenedor-clientes/listado/listado-clientes.component';
import { MantenedorClientesGestionComponent } from './mantenedor-clientes/mantenedor-clientes.component';
import { EmpleadoFormDialogGestionComponent } from './mantenedor-empleados/form-dialog/empleado-form-dialog.component';
import { ListadoEmpleadosGestionComponent } from './mantenedor-empleados/listado/listado-empleados.component';
import { MantenedorEmpleadosGestionComponent } from './mantenedor-empleados/mantenedor-empleados.component';
import { OrdenCompraFormDialogGestionComponent } from './mantenedor-ordenes_compra/form-dialog/orden_compra-form-dialog.component';
import { ListadoOrdenesCompraGestionComponent } from './mantenedor-ordenes_compra/listado/listado-ordenes_compra.component';
import { MantenedorOrdenesCompraGestionComponent } from './mantenedor-ordenes_compra/mantenedor-ordenes_compra.component';
import { ProductoFormDialogGestionComponent } from './mantenedor-productos/form-dialog/producto-form-dialog.component';
import { ListadoProductosGestionComponent } from './mantenedor-productos/listado/listado-productos.component';
import { MantenedorProductosGestionComponent } from './mantenedor-productos/mantenedor-productos.component';
import { ProveedorFormDialogGestionComponent } from './mantenedor-proveedores/form-dialog/proveedor-form-dialog.component';
import { ListadoProveedoresGestionComponent } from './mantenedor-proveedores/listado/listado-proveedores.component';
import { MantenedorProveedoresGestionComponent } from './mantenedor-proveedores/mantenedor-proveedores.component';
import { UsuarioFormDialogGestionComponent } from './mantenedor-usuarios/form-dialog/usuario-form-dialog.component';
import { ListadoUsuariosGestionComponent } from './mantenedor-usuarios/listado/listado-usuarios.component';
import { MantenedorUsuariosGestionComponent } from './mantenedor-usuarios/mantenedor-usuarios.component';
import { VentaFormDialogGestionComponent } from './mantenedor-ventas/form-dialog/venta-form-dialog.component';
import { ListadoVentasGestionComponent } from './mantenedor-ventas/listado/listado-ventas.component';
import { MantenedorVentasGestionComponent } from './mantenedor-ventas/mantenedor-ventas.component';
import { ResumenGestionComponent } from './resumen/resumen.component';

const SNACKBAR_DEFAULTS: MatSnackBarConfig = {
  duration: 5000
};

@NgModule({
  declarations: [
    GestionComponent,
    MantenedorClientesGestionComponent,
    ClienteFormDialogGestionComponent,
    ListadoClientesGestionComponent,
    MantenedorEmpleadosGestionComponent,
    EmpleadoFormDialogGestionComponent,
    ListadoEmpleadosGestionComponent,
    MantenedorProductosGestionComponent,
    ListadoProductosGestionComponent,
    ProductoFormDialogGestionComponent,
    MantenedorProveedoresGestionComponent,
    ListadoProveedoresGestionComponent,
    ProveedorFormDialogGestionComponent,
    MantenedorVentasGestionComponent,
    ListadoVentasGestionComponent,
    VentaFormDialogGestionComponent,
    AgregarProductoDialogComponent,
    MantenedorUsuariosGestionComponent,
    ListadoUsuariosGestionComponent,
    UsuarioFormDialogGestionComponent,
    MantenedorOrdenesCompraGestionComponent,
    ListadoOrdenesCompraGestionComponent,
    OrdenCompraFormDialogGestionComponent,
    ResumenGestionComponent
  ],
  imports: [
    SharedModule,
    GestionRoutingModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: SNACKBAR_DEFAULTS }
  ]
})
export class GestionModule { }
