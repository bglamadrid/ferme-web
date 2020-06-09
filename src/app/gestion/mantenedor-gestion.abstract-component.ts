import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize, tap, catchError, delay, take } from 'rxjs/operators';
import { AfterViewInit, OnInit } from '@angular/core';
import { EntityDataService } from 'src/data/entity.data.iservice';

export abstract class MantenedorGestionComponent<T>
  implements OnInit {

  protected abstract httpSvc: EntityDataService<T>;
  protected abstract dialog: MatDialog;

  protected cargandoItemsSource: Subject<boolean>;
  protected ocupadoSource: Subject<boolean>;
  protected itemsSource: Subject<T[]>;

  public cargandoItems$: Observable<boolean>;
  public ocupado$: Observable<boolean>;
  public items$: Observable<T[]>;

  constructor() {
    this.cargandoItemsSource = new BehaviorSubject(false);
    this.ocupadoSource = new BehaviorSubject(true);
    this.itemsSource = new Subject();

    this.cargandoItems$ = this.cargandoItemsSource.asObservable();
    this.ocupado$ = this.ocupadoSource.asObservable();
    this.items$ = this.itemsSource.asObservable();
  }

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
