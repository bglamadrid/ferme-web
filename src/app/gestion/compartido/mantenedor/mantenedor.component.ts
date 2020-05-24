import { Observable, BehaviorSubject } from 'rxjs';
import { ListadoGestionComponent } from '../listado/listado.component';
import { MantenedorGestion } from './mantenedor.interface';
import { RootHttpService } from 'src/http-services/root-http.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AfterViewInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

export abstract class MantenedorGestionComponent<T>
  implements MantenedorGestion<T>, AfterViewInit {

  protected ocupadoSource: BehaviorSubject<boolean>;
  protected itemsSource: BehaviorSubject<T[]>;

  protected httpSvc: RootHttpService;
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
