import { Observable, BehaviorSubject } from 'rxjs';
import { ListadoGestionComponent } from '../listado/listado.component';
import { MantenedorGestion } from './mantenedor.interface';
import { RootHttpService } from 'src/http-services/root.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AfterViewInit } from '@angular/core';

export abstract class MantenedorGestionComponent<T>
  implements MantenedorGestion<T>, AfterViewInit {

  protected _ocupado$: BehaviorSubject<boolean>;
  protected _items$: BehaviorSubject<T[]>;
  
  protected httpSvc: RootHttpService;
  protected dialog: MatDialog;
  protected snackBar: MatSnackBar;


  public cargandoItems: boolean;
  public ocupado$: Observable<boolean>;
  public items$: Observable<T[]>;
  
  public listado: ListadoGestionComponent<T>;

  constructor() { 
    this.cargandoItems = true;
    this._ocupado$ = new BehaviorSubject<boolean>(true);
    this.ocupado$ = this._ocupado$.asObservable();

    
    this._items$ = new BehaviorSubject<T[]>([]);
    this.items$ = this._items$.asObservable();

    this._ocupado$.next(false);
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    this.onCargar();
    
  }

  protected terminarCargaItems(): void {
    this.cargandoItems = false;
    this._ocupado$.next(false);
  }

  protected terminarEdicion(): void {
    this._ocupado$.next(false);
  }

  public cargarItems(): Observable<T[]> {
    throw Error("Método por defecto; no configurado.");
  }

  public abrirDialogoEdicion(item: T): Observable<T> {
    throw Error("Método por defecto; no configurado.");
  }

  protected iniciarCargaItems(): Observable<T[]> {
    this.cargandoItems = true;
    return this.cargarItems();
  }

  protected intentarEdicion(item: T): Observable<T> {
    this._ocupado$.next(true);
    return this.abrirDialogoEdicion(item);
  }

  public onCargar(): void {
    console.log("onCargar");
    
    this.iniciarCargaItems().subscribe(
      (rspSvc: T[]) => {
        this._items$.next(rspSvc);
      }, err => {
        console.log(err);
        this._items$.next([]);
      }, 
      () => { this.terminarCargaItems(); }
    );
  }

  public onClickEditar(item: T): void {
    this.intentarEdicion(item).subscribe(
      (nuevo: T) => {
        if (nuevo) { this.onCargar(); }
      },
      err => { console.log(err); },
      () => { this.terminarEdicion(); }
    );
  }

  public onClickAgregar(): void {
    this.intentarEdicion(undefined).subscribe(
      (nuevo: T) => {
        if (nuevo) { this.onCargar(); }
      },
      err => { console.log(err); },
      () => { this.terminarEdicion(); }
    );
  }

  public onClickBorrar(item: T): void {
    throw Error("Método por defecto; no configurado.");
  }



}
