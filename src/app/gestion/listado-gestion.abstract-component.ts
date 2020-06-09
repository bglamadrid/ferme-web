import { Output, Input, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export abstract class ListadoGestionComponent<T> {

  protected itemsSource: Subject<T[]> = new Subject();
  protected ocupadoSource: Subject<boolean> = new Subject();


  public items$: Observable<T[]> = this.itemsSource.asObservable();
  public ocupado$: Observable<boolean> = this.ocupadoSource.asObservable();
  public abstract columnasTabla: string[];

  @Output() public cargar: EventEmitter<void> = new EventEmitter();
  @Output() public editar: EventEmitter<T>;
  @Output() public borrar: EventEmitter<T>;


  @Input() public set items(i: T[]) {
    this.itemsSource.next(i);
  }

  @Input() public set ocupado(o: boolean) {
    this.ocupadoSource.next(o);
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
