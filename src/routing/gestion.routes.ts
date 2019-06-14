import { Routes } from '@angular/router';
import { ClientesComponent } from '../app/gestion/clientes/clientes.component';
import { EmpleadosComponent } from '../app/gestion/empleados/empleados.component';
import { ProductosComponent } from '../app/gestion/productos/productos.component';
import { ProveedoresComponent } from '../app/gestion/proveedores/proveedores.component';
import { VentasComponent } from '../app/gestion/ventas/ventas.component';

export const FERME_GESTION_ROUTES: Routes = [
    { path: "clientes", component: ClientesComponent },
    { path: "empleados", component: EmpleadosComponent },
    { path: "productos", component: ProductosComponent },
    { path: "proveedores", component: ProveedoresComponent },
    { path: "ventas", component: VentasComponent }
    // { path: "usuarios" },
    // { path: "ordenes_compra" },
];