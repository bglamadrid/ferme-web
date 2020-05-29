import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompraRoutingModule } from 'src/app/compra/compra.routing.module';

import { CompraCatalogoComponent } from './catalogo/catalogo.component';
import { CompraResumenComponent } from './resumen/resumen.component';
import { CompraNavegadorComponent } from './compra.component';
import { CompraLoginDialogComponent } from './login-dialog/login.component';

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
    SharedModule,
    CompraRoutingModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: SNACKBAR_DEFAULTS}
  ]
})
export class CompraModule { }
