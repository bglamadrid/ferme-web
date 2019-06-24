import { Routes } from '@angular/router';
import { ClientesComponent } from '../app/gestion/clientes/clientes.component';
import { EmpleadosComponent } from '../app/gestion/empleados/empleados.component';
import { ProductosComponent } from '../app/gestion/productos/productos.component';
import { ProveedoresComponent } from '../app/gestion/proveedores/proveedores.component';
import { VentasComponent } from '../app/gestion/ventas/ventas.component';
import { UsuariosComponent } from 'src/app/gestion/usuarios/usuarios.component';
import { OrdenesCompraComponent } from 'src/app/gestion/ordenes_compra/ordenes_compra.component';
import { Cargos } from 'src/enums/CargosEnum';

export const FERME_AUTHORIZED_CARGOS: { [key: string]: number[] } = {
    'clientes': [Cargos.Administrador],
    'empleados': [Cargos.Administrador],
    'productos': [Cargos.Administrador, Cargos.Encargado],
    'proveedores': [Cargos.Administrador, Cargos.Encargado],
    'ventas': [Cargos.Administrador, Cargos.Vendedor],
    'ordenes_compra': [Cargos.Administrador, Cargos.Encargado],
    'usuarios': [Cargos.Administrador]
};

export const FERME_GESTION_ROUTES: Routes = [
    { path: "clientes", component: ClientesComponent },
    { path: "empleados", component: EmpleadosComponent },
    { path: "productos", component: ProductosComponent },
    { path: "proveedores", component: ProveedoresComponent },
    { path: "ventas", component: VentasComponent },
    { path: "ordenes_compra", component: OrdenesCompraComponent },
    { path: "usuarios", component: UsuariosComponent },
];