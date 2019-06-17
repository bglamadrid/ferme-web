import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenteredMatSpinnerComponent } from './centered-mat-spinner/centered.component';
import { ListadoAccionesComponent } from './listado-acciones/listado-acciones.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule, MatListModule, MatButtonModule, MatDialogModule, MatSnackBarModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CenteredMatSpinnerComponent,
    ListadoAccionesComponent
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
    MatFormFieldModule
  ], 
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ListadoAccionesComponent,
    CenteredMatSpinnerComponent
  ]
})

export class CommonAssetsModule { }