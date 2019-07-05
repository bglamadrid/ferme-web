import { NgModule } from '@angular/core';
import { MatExpansionModule, MatSelectModule, MatSidenavModule, MatTableModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { FermeCompartidoModule } from 'src/app/compartido/common.module';
import { CompraRoutingModule } from 'src/routing/compra-routing.module';

import { CompraCatalogoComponent } from './catalogo/catalogo.component';
import { CompraResumenComponent } from './resumen/resumen.component';
import { CompraNavegadorComponent } from './navegador/compra.component';
import { CompraLoginDialogComponent } from './dialogos/login/login.component';

const SNACKBAR_DEFAULTS = {
  duration: 3000
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
