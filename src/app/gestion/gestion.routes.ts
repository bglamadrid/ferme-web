import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';

export const FERME_GESTION_ROUTES: Routes = [
    { path: "clientes", component: ClientesComponent },
    // { path: "proveedores" },
    // { path: "empleados" },
    // { path: "usuarios" },
    // { path: "productos" },
    // { path: "ordenes_compra" },
    // { path: "ventas" }
];