import { NgModule } from '@angular/core';
import { MatExpansionModule, MatSelectModule, MatSidenavModule, MatTableModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { CommonAssetsModule } from 'src/app/compartido/common.module';
import { CompraRoutingModule } from 'src/routing/compra-routing.module';

import { CatalogoComponent } from './catalogo/catalogo.component';
import { ResumenComponent } from './resumen/resumen.component';
import { CompraNavegadorComponent } from './navegador/compra.component';
import { CompraLoginDialogComponent } from './dialogos/login/login.component';

const SNACKBAR_DEFAULTS = {
  duration: 3000
};

@NgModule({
  declarations: [
    CompraNavegadorComponent,
    CatalogoComponent,
    ResumenComponent,
    CompraLoginDialogComponent
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
    CompraLoginDialogComponent
  ], 
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: SNACKBAR_DEFAULTS}
  ]
})
export class CompraModule { }
