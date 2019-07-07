import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule, MatListModule, MatButtonModule, MatDialogModule, MatSnackBarModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatSidenavModule, MatTableModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatProgressSpinnerCentradoComponent } from './mat-spinner-centrado/component';
import { ListadoAccionesComponent } from './listado-acciones/listado-acciones.component';
import { FiltrosProductosComponent } from './filtros-productos/filtros-productos.component';

@NgModule({
  declarations: [
    MatProgressSpinnerCentradoComponent,
    ListadoAccionesComponent,
    FiltrosProductosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
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
    MatSelectModule
  ], 
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
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

    ListadoAccionesComponent,
    FiltrosProductosComponent,
    MatProgressSpinnerCentradoComponent
  ]
})

export class FermeCompartidoModule { }