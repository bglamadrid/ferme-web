import { Routes } from '@angular/router';
import { MantenedorClientesGestionComponent } from 'src/app/gestion/mantenedor-clientes/mantenedor-clientes.component';
import { MantenedorEmpleadosGestionComponent } from 'src/app/gestion/mantenedor-empleados/mantenedor-empleados.component';
import { MantenedorProductosGestionComponent } from 'src/app/gestion/mantenedor-productos/mantenedor-productos.component';
import { MantenedorProveedoresGestionComponent } from 'src/app/gestion/mantenedor-proveedores/mantenedor-proveedores.component';
import { MantenedorVentasGestionComponent } from 'src/app/gestion/mantenedor-ventas/mantenedor-ventas.component';
import { MantenedorOrdenesCompraGestionComponent } from 'src/app/gestion/mantenedor-ordenes_compra/mantenedor-ordenes_compra.component';
import { MantenedorUsuariosGestionComponent } from 'src/app/gestion/mantenedor-usuarios/mantenedor-usuarios.component';
import { ResumenGestionComponent } from 'src/app/gestion/resumen/resumen.component';

export const GESTION_ROUTES: Routes = [
  {
    path: 'resumen',
    component: ResumenGestionComponent
  },
  {
    path: 'clientes',
    component: MantenedorClientesGestionComponent
  },
  {
    path: 'empleados',
    component: MantenedorEmpleadosGestionComponent
  },
  {
    path: 'productos',
    component: MantenedorProductosGestionComponent
  },
  {
    path: 'proveedores',
    component: MantenedorProveedoresGestionComponent
  },
  {
    path: 'ventas',
    component: MantenedorVentasGestionComponent
  },
  {
    path: 'ordenes_compra',
    component: MantenedorOrdenesCompraGestionComponent
  },
  {
    path: 'usuarios',
    component: MantenedorUsuariosGestionComponent
  },
  {
    path: '**',
    redirectTo: 'resumen',
    pathMatch: 'prefix'
  }
];
