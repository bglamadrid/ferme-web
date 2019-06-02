import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { EmpleadosComponent } from './empleados/empleados.component';

export const FERME_GESTION_ROUTES: Routes = [
    { path: "clientes", component: ClientesComponent },
    { path: "empleados", component: EmpleadosComponent },
    // { path: "proveedores" },
    // { path: "usuarios" },
    // { path: "productos" },
    // { path: "ordenes_compra" },
    // { path: "ventas" }
];