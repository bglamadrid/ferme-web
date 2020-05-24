import { EventEmitter, } from '@angular/core';
import { MatTable } from '@angular/material/table';

export interface ListadoGestion<T> {

  tabla: MatTable<T>;
  columnasTabla: string[];
  Items?: T[];
  
  cargar?: EventEmitter<void>;
  editar?: EventEmitter<T>;
  borrar?: EventEmitter<T>;

  ocupado?: boolean;

  onClickEditar?(itemTabla: T): void;
  onClickBorrar?(itemTabla: T): void;
}
