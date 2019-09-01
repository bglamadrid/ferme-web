import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { FermeCompartidoModule } from 'src/app/compartido/common.module';
import { CompraRoutingModule } from 'src/routing/compra-routing.module';

import { CompraCatalogoComponent } from './paginas/catalogo/catalogo.component';
import { CompraResumenComponent } from './paginas/resumen/resumen.component';
import { CompraNavegadorComponent } from './navegador/compra.component';
import { CompraLoginDialogComponent } from './dialogos/login/login.component';

const SNACKBAR_DEFAULTS = {
  duration: 5000
};

@NgModule({
  declarations: [
    CompraNavegadorComponent,
    CompraCatalogoComponent,
    CompraResumenComponent,
    CompraLoginDialogComponent
  ],
  imports: [
    FermeCompartidoModule,
    CompraRoutingModule
  ],
  entryComponents: [
    CompraLoginDialogComponent
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: SNACKBAR_DEFAULTS}
  ]
})
export class CompraModule { }
