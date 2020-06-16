import { EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractEntity } from 'src/models/AbstractEntity';
import { MantenedorGestionAbstractService } from './mantenedor-gestion.abstract-service';

export abstract class ListadoGestionComponent<T extends AbstractEntity>
  implements OnInit {

  protected abstract service: MantenedorGestionAbstractService<T>;

  public abstract columnasTabla: string[];
  public items$: Observable<T[]>;
  public ocupado$: Observable<boolean>;

  @Output() public cargar: EventEmitter<void> = new EventEmitter();
  @Output() public editar: EventEmitter<T> = new EventEmitter();
  @Output() public borrar: EventEmitter<T> = new EventEmitter();

  ngOnInit() {
    this.ocupado$ = this.service.focusedItems$.pipe(map(items => items.length === 0));
    this.items$ = this.service.items$.pipe();
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

}
