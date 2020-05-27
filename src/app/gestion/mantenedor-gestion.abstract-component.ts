import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpService } from 'src/data/http/http.abstract-service';
import { ListadoGestionComponent } from './listado-gestion.abstract-component';
import { AfterViewInit } from '@angular/core';
import { EntityDataService } from 'src/data/entity.data.iservice';

export abstract class MantenedorGestionComponent<T>
  implements AfterViewInit {

  protected ocupadoSource: BehaviorSubject<boolean>;
  protected itemsSource: BehaviorSubject<T[]>;

  protected httpSvc: EntityDataService<T>;
  protected dialog: MatDialog;
  protected snackBar: MatSnackBar;


  public cargandoItems: boolean;
  public ocupado$: Observable<boolean>;
  public items$: Observable<T[]>;

  public listado: ListadoGestionComponent<T>;

  constructor() {
    this.cargandoItems = true;
    this.ocupadoSource = new BehaviorSubject(true);
    this.ocupado$ = this.ocupadoSource.asObservable();


    this.itemsSource = new BehaviorSubject([]);
    this.items$ = this.itemsSource.asObservable();

    this.ocupadoSource.next(false);
  }

  ngAfterViewInit() {
    this.onCargar();
  }

  protected terminarCargaItems(): void {
    this.cargandoItems = false;
    this.ocupadoSource.next(false);
  }

  protected terminarEdicion(): void {
    this.ocupadoSource.next(false);
  }

  public cargarItems(): Observable<T[]> {
    throw Error('Operación no soportada.');
  }

  public abrirDialogoEdicion(item: T): Observable<T> {
    throw Error('Operación no soportada.');
  }

  protected iniciarCargaItems(): Observable<T[]> {
    this.cargandoItems = true;
    return this.cargarItems();
  }

  protected intentarEdicion(item: T): Observable<T> {
    this.ocupadoSource.next(true);
    return this.abrirDialogoEdicion(item);
  }

  public onCargar(): void {
    this.iniciarCargaItems().pipe(
      finalize(() => { this.terminarCargaItems(); })
    ).subscribe(
      (items: T[]) => {
        this.itemsSource.next(items);
      },
      () => {
        this.itemsSource.next([]);
      }
    );
  }

  public onClickEditar(item: T): void {
    this.intentarEdicion(item).pipe(
      finalize(() => { this.terminarEdicion(); })
    ).subscribe(
      (nuevo: T) => {
        if (nuevo) { this.onCargar(); }
      },
      err => {
        console.log(err);
      }
    );
  }

  public onClickAgregar(): void {
    this.intentarEdicion(undefined).pipe(
      finalize(() => { this.terminarEdicion(); })
    ).subscribe(
      (nuevo: T) => {
        if (nuevo) { this.onCargar(); }
      },
      err => {
        console.log(err);
      }
    );
  }

  public onClickBorrar(item: T): void {
    throw Error('Operación no soportada.');
  }

}
