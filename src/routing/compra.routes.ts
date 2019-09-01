import { Routes } from '@angular/router';
import { CompraCatalogoComponent } from 'src/app/compra/paginas/catalogo/catalogo.component';
import { CompraResumenComponent } from 'src/app/compra/paginas/resumen/resumen.component';

export const FERME_COMPRA_ROUTES: Routes = [
    { path: 'catalogo', component: CompraCatalogoComponent },
    { path: 'resumen', component: CompraResumenComponent },
    { path: '**', redirectTo: 'catalogo', pathMatch: 'prefix' }
];
