import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ProductosComponent } from './productos/productos.component';

export const FERME_GESTION_ROUTES: Routes = [
    { path: "clientes", component: ClientesComponent },
    { path: "empleados", component: EmpleadosComponent },
    { path: "productos", component: ProductosComponent }
    // { path: "proveedores" },
    // { path: "usuarios" },
    
    // { path: "ordenes_compra" },
    // { path: "ventas" }
];