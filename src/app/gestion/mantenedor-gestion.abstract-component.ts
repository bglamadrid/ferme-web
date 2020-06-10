import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { EntityDataService } from 'src/data/entity.data.iservice';

export abstract class MantenedorGestionComponent<T>
  implements OnInit {

  protected abstract httpSvc: EntityDataService<T>;
  protected abstract dialog: MatDialog;

  protected cargandoItemsSource: Subject<boolean> = new BehaviorSubject(false);
  protected ocupadoSource: Subject<boolean> = new BehaviorSubject(true);
  protected itemsSource: Subject<T[]> = new Subject();

  public cargandoItems$: Observable<boolean> = this.cargandoItemsSource.asObservable();
  public ocupado$: Observable<boolean> = this.ocupadoSource.asObservable();
  public items$: Observable<T[]> = this.itemsSource.asObservable();

  ngOnInit() {
    this.onCargar();
  }

  public abstract cargarItems(): Observable<T[]>;
  public abstract abrirDialogoEdicion(item: T): Observable<T>;

  protected terminarEdicion(): void {
    this.ocupadoSource.next(false);
    this.onCargar();
  }

  protected intentarEdicion(item: T): Observable<T> {
    this.ocupadoSource.next(true);
    return this.abrirDialogoEdicion(item).pipe(
      finalize(() => { this.terminarEdicion(); })
    );
  }

  public onCargar(): void {
    this.cargandoItemsSource.next(true);
    this.cargarItems().pipe(
      tap(items => this.itemsSource.next(items)),
      finalize(() => { this.cargandoItemsSource.next(false); })
    ).subscribe();
  }

  public onClickEditar(item: T): void {
    this.intentarEdicion(item).subscribe();
  }

  public onClickAgregar(): void {
    this.intentarEdicion(undefined).subscribe();
  }

  public onClickBorrar(item: T): void {
    throw Error('Operación no soportada.');
  }

}
