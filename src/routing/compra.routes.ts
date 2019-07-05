import { Routes } from '@angular/router';
import { CompraCatalogoComponent } from 'src/app/compra/catalogo/catalogo.component';
import { CompraResumenComponent } from 'src/app/compra/resumen/resumen.component';

export const FERME_COMPRA_ROUTES: Routes = [
    { path: "", redirectTo: "catalogo", pathMatch: "full" },
    { path: "catalogo", component: CompraCatalogoComponent },
    { path: "resumen", component: CompraResumenComponent },
];