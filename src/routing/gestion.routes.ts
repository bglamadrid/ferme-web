import { Routes } from '@angular/router';
import { Cargos } from 'src/enums/CargosEnum';
import { ClientesComponent } from 'src/app/gestion/mantenedores/clientes/clientes.component';
import { EmpleadosComponent } from 'src/app/gestion/mantenedores/empleados/empleados.component';
import { ProductosComponent } from 'src/app/gestion/mantenedores/productos/productos.component';
import { ProveedoresComponent } from 'src/app/gestion/mantenedores/proveedores/proveedores.component';
import { VentasComponent } from 'src/app/gestion/mantenedores/ventas/ventas.component';
import { OrdenesCompraComponent } from 'src/app/gestion/mantenedores/ordenes_compra/ordenes_compra.component';
import { UsuariosComponent } from 'src/app/gestion/mantenedores/usuarios/usuarios.component';

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