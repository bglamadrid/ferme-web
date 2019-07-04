import { NgModule } from '@angular/core';
import { MatExpansionModule, MatSelectModule, MatSidenavModule, MatTableModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { CommonAssetsModule } from 'src/app/compartido/common.module';
import { CompraRoutingModule } from 'src/routing/compra-routing.module';

import { CatalogoComponent } from './catalogo/catalogo.component';
import { ResumenComponent } from './resumen/resumen.component';
import { CompraNavegadorComponent } from './navegador/compra.component';

const SNACKBAR_DEFAULTS = {
  duration: 3000
};

@NgModule({
  declarations: [
    CompraNavegadorComponent,
    CatalogoComponent,
    ResumenComponent
  ],
  imports: [
    CommonAssetsModule,
    CompraRoutingModule,
    MatSidenavModule,
    MatTableModule,
    MatSelectModule,
    MatExpansionModule
  ],
  entryComponents: [
  ], 
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: SNACKBAR_DEFAULTS}
  ]
})
export class CompraModule { }
