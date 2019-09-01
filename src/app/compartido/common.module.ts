import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatProgressSpinnerModule,
  MatListModule,
  MatButtonModule,
  MatDialogModule,
  MatSnackBarModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatSidenavModule,
  MatTableModule,
  MatSelectModule,
  MatMenuModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatProgressSpinnerCentradoComponent } from './mat-spinner-centrado/component';
import { ListadoAccionesComponent } from './listado-acciones/listado-acciones.component';
import { FiltrosProductosComponent } from './filtros-productos/filtros-productos.component';
import { ConfirmacionDialogComponent } from '../dialogos/confirmacion/confirmacion.component';
import { FormularioDatosPersonaComponent } from './formulario-datos-persona/formulario-datos-persona.component';
import { DatosUsuarioDialogComponent } from '../dialogos/datos-usuario/datos-usuario.component';

@NgModule({
  declarations: [
    MatProgressSpinnerCentradoComponent,
    ListadoAccionesComponent,
    FiltrosProductosComponent,
    ConfirmacionDialogComponent,
    FormularioDatosPersonaComponent,
    DatosUsuarioDialogComponent
  ],
  entryComponents: [
    ConfirmacionDialogComponent,
    FormularioDatosPersonaComponent,
    DatosUsuarioDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSidenavModule,
    MatTableModule,
    MatMenuModule,
    MatSelectModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSidenavModule,
    MatTableModule,
    MatSelectModule,
    MatMenuModule,

    ListadoAccionesComponent,
    FiltrosProductosComponent,
    MatProgressSpinnerCentradoComponent,
    ConfirmacionDialogComponent,
    FormularioDatosPersonaComponent,
    DatosUsuarioDialogComponent
  ]
})

export class FermeCompartidoModule { }
