import { NgModule } from '@angular/core';
import { MatSnackBarConfig, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { GestionRoutingModule } from 'src/app/gestion/gestion.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CabeceraGestionComponent } from './cabecera/cabecera-gestion.component';
import { GestionComponent } from './gestion.component';
import { AgregarProductoDialogComponent } from './get-productos-array-dialog/agregar-producto.component';
import { ClienteFormDialogGestionComponent } from './mantenedor-clientes/form-dialog/cliente-form-dialog.component';
import { MantenedorClientesGestionComponent } from './mantenedor-clientes/mantenedor-clientes.component';
import { MantenedorClientesGestionService } from './mantenedor-clientes/mantenedor-clientes.service';
import { EmpleadoFormDialogGestionComponent } from './mantenedor-empleados/form-dialog/empleado-form-dialog.component';
import { MantenedorEmpleadosGestionComponent } from './mantenedor-empleados/mantenedor-empleados.component';
import { MantenedorEmpleadosGestionService } from './mantenedor-empleados/mantenedor-empleados.service';
import { OrdenCompraFormDialogGestionComponent } from './mantenedor-ordenes_compra/form-dialog/orden_compra-form-dialog.component';
import { MantenedorOrdenesCompraGestionService } from './mantenedor-ordenes_compra/mantenedor-ordenes-compra.service';
import { MantenedorOrdenesCompraGestionComponent } from './mantenedor-ordenes_compra/mantenedor-ordenes_compra.component';
import { ProductoFormDialogGestionComponent } from './mantenedor-productos/form-dialog/producto-form-dialog.component';
import { MantenedorProductosGestionComponent } from './mantenedor-productos/mantenedor-productos.component';
import { MantenedorProductosGestionService } from './mantenedor-productos/mantenedor-productos.service';
import { ProveedorFormDialogGestionComponent } from './mantenedor-proveedores/form-dialog/proveedor-form-dialog.component';
import { MantenedorProveedoresGestionComponent } from './mantenedor-proveedores/mantenedor-proveedores.component';
import { MantenedorProveedoresGestionService } from './mantenedor-proveedores/mantenedor-proveedores.service';
import { UsuarioFormDialogGestionComponent } from './mantenedor-usuarios/form-dialog/usuario-form-dialog.component';
import { MantenedorUsuariosGestionComponent } from './mantenedor-usuarios/mantenedor-usuarios.component';
import { MantenedorUsuariosGestionService } from './mantenedor-usuarios/mantenedor-usuarios.service';
import { VentaFormDialogGestionComponent } from './mantenedor-ventas/form-dialog/venta-form-dialog.component';
import { MantenedorVentasGestionComponent } from './mantenedor-ventas/mantenedor-ventas.component';
import { MantenedorVentasGestionService } from './mantenedor-ventas/mantenedor-ventas.service';
import { ResumenGestionComponent } from './resumen/resumen.component';
import { GestionService } from './gestion.service';

const SNACKBAR_DEFAULTS: MatSnackBarConfig = {
  duration: 5000
};

@NgModule({
  declarations: [
    GestionComponent,
    CabeceraGestionComponent,
    MantenedorClientesGestionComponent,
    ClienteFormDialogGestionComponent,
    MantenedorEmpleadosGestionComponent,
    EmpleadoFormDialogGestionComponent,
    MantenedorProductosGestionComponent,
    ProductoFormDialogGestionComponent,
    MantenedorProveedoresGestionComponent,
    ProveedorFormDialogGestionComponent,
    MantenedorVentasGestionComponent,
    VentaFormDialogGestionComponent,
    AgregarProductoDialogComponent,
    MantenedorUsuariosGestionComponent,
    UsuarioFormDialogGestionComponent,
    MantenedorOrdenesCompraGestionComponent,
    OrdenCompraFormDialogGestionComponent,
    ResumenGestionComponent
  ],
  imports: [
    SharedModule,
    GestionRoutingModule
  ],
  exports: [
    GestionRoutingModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: SNACKBAR_DEFAULTS },
    GestionService,
    MantenedorClientesGestionService,
    MantenedorEmpleadosGestionService,
    MantenedorOrdenesCompraGestionService,
    MantenedorProductosGestionService,
    MantenedorProveedoresGestionService,
    MantenedorUsuariosGestionService,
    MantenedorVentasGestionService
  ]
})
export class GestionModule { }
