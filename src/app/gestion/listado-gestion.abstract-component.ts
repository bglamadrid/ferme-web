import { Output, Input, EventEmitter, Directive } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { of } from 'rxjs';

@Directive()
export abstract class ListadoGestionComponent<T> {

  @Output() public cargar: EventEmitter<void>;
  @Output() public editar: EventEmitter<T>;
  @Output() public borrar: EventEmitter<T>;

  public tabla: MatTable<T>;
  @Input() public ocupado: boolean;
  public columnasTabla: string[];

  constructor() {
    this.columnasTabla = [];
    this.cargar = new EventEmitter();
    this.editar = new EventEmitter();
    this.borrar = new EventEmitter();
    this.ocupado = false;
  }

  public onClickEditar(item: T) {
    if (this.editar) {
      this.editar.emit(item);
    }
  }

  public onClickBorrar(item: T) {
    if (this.borrar) {
      this.borrar.emit(item);
    }
  }

  @Input() public set Items(input: T[]) {
    if (this.tabla) {
      if (input) {
        this.tabla.dataSource = of(input);
      } else {
        this.tabla.dataSource = of([]);
      }
    }
  }

}