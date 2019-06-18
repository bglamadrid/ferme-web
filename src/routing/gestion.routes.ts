import { Routes } from '@angular/router';
import { ClientesComponent } from '../app/gestion/clientes/clientes.component';
import { EmpleadosComponent } from '../app/gestion/empleados/empleados.component';
import { ProductosComponent } from '../app/gestion/productos/productos.component';
import { ProveedoresComponent } from '../app/gestion/proveedores/proveedores.component';
import { VentasComponent } from '../app/gestion/ventas/ventas.component';
import { UsuariosComponent } from 'src/app/gestion/usuarios/usuarios.component';
import { OrdenesCompraComponent } from 'src/app/gestion/ordenes_compra/ordenes_compra.component';

export const FERME_GESTION_ROUTES: Routes = [
    { path: "clientes", component: ClientesComponent },
    { path: "empleados", component: EmpleadosComponent },
    { path: "productos", component: ProductosComponent },
    { path: "proveedores", component: ProveedoresComponent },
    { path: "ventas", component: VentasComponent },
    { path: "ordenes_compra", component: OrdenesCompraComponent },
    { path: "usuarios", component: UsuariosComponent },
];