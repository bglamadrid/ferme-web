import { Routes } from '@angular/router';
import { CargosEnum } from 'src/enums/CargosEnum';
import { ClientesGestionComponent } from 'src/app/gestion/paginas/clientes/clientes.component';
import { GestionEmpleadosComponent } from 'src/app/gestion/paginas/empleados/empleados.component';
import { ProductosGestionComponent } from 'src/app/gestion/paginas/productos/productos.component';
import { ProveedoresGestionComponent } from 'src/app/gestion/paginas/proveedores/proveedores.component';
import { VentasGestionComponent } from 'src/app/gestion/paginas/ventas/ventas.component';
import { OrdenesCompraGestionComponent } from 'src/app/gestion/paginas/ordenes_compra/ordenes_compra.component';
import { UsuariosGestionComponent } from 'src/app/gestion/paginas/usuarios/usuarios.component';
import { ResumenGestionComponent } from 'src/app/gestion/paginas/resumen/resumen.component';

export const FERME_AUTHORIZED_CARGOS: { [key: string]: CargosEnum[] } = {
  resumen: [CargosEnum.Administrador, CargosEnum.Encargado, CargosEnum.Vendedor],
  clientes: [CargosEnum.Administrador],
  empleados: [CargosEnum.Administrador],
  productos: [CargosEnum.Administrador, CargosEnum.Encargado],
  proveedores: [CargosEnum.Administrador, CargosEnum.Encargado],
  ventas: [CargosEnum.Administrador, CargosEnum.Vendedor],
  ordenes_compra: [CargosEnum.Administrador, CargosEnum.Encargado],
  usuarios: [CargosEnum.Administrador]
};

export const FERME_GESTION_ROUTES: Routes = [
  { path: 'resumen', component: ResumenGestionComponent },
  { path: 'clientes', component: ClientesGestionComponent },
  { path: 'empleados', component: GestionEmpleadosComponent },
  { path: 'productos', component: ProductosGestionComponent },
  { path: 'proveedores', component: ProveedoresGestionComponent },
  { path: 'ventas', component: VentasGestionComponent },
  { path: 'ordenes_compra', component: OrdenesCompraGestionComponent },
  { path: 'usuarios', component: UsuariosGestionComponent },
  { path: '**', redirectTo: 'resumen', pathMatch: 'prefix' }
];
