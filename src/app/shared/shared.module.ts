import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { ConfirmacionDialogComponent } from './confirmation-dialog/confirmacion.component';
import { DatosPersonaFormComponent } from './datos-persona-form/datos-persona-form.component';
import { FiltrosProductosPanelComponent } from './filtros-productos-panel/filtros-productos-panel.component';
import { ListadoAccionesComponent } from './listado-acciones/listado-acciones.component';
import { MatProgressSpinnerCentradoComponent } from './mat-spinner-centrado/component';
import { PerfilUsuarioFormDialogComponent } from './perfil-usuario-form-dialog/perfil-usuario-form-dialog.component';


@NgModule({
  declarations: [
    MatProgressSpinnerCentradoComponent,
    ListadoAccionesComponent,
    ConfirmacionDialogComponent,
    DatosPersonaFormComponent,
    FiltrosProductosPanelComponent,
    PerfilUsuarioFormDialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  exports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,

    MatProgressSpinnerCentradoComponent,
    ListadoAccionesComponent,
    ConfirmacionDialogComponent,
    DatosPersonaFormComponent,
    FiltrosProductosPanelComponent,
    PerfilUsuarioFormDialogComponent
  ]
})

export class SharedModule { }
