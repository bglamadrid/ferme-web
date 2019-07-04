import { Routes } from '@angular/router';
import { CatalogoComponent } from 'src/app/compra/catalogo/catalogo.component';
import { ResumenComponent } from 'src/app/compra/resumen/resumen.component';

// export const FERME_AUTHORIZED_CARGOS: { [key: string]: number[] } = {
//     'clientes': [Cargos.Administrador],
//     'empleados': [Cargos.Administrador],
//     'productos': [Cargos.Administrador, Cargos.Encargado],
//     'proveedores': [Cargos.Administrador, Cargos.Encargado],
//     'ventas': [Cargos.Administrador, Cargos.Vendedor],
//     'ordenes_compra': [Cargos.Administrador, Cargos.Encargado],
//     'usuarios': [Cargos.Administrador]
// };

export const FERME_COMPRA_ROUTES: Routes = [
    { path: "", redirectTo: "catalogo", pathMatch: "full" },
    { path: "catalogo", component: CatalogoComponent },
    { path: "resumen", component: ResumenComponent },
];