import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { delay, finalize, map, tap } from 'rxjs/operators';
import { MantenedorGestionAbstractService } from './mantenedor-gestion.abstract-service';
import { AbstractEntity } from 'src/models/AbstractEntity';

export abstract class MantenedorGestionAbstractComponent<T extends AbstractEntity>
  implements OnInit {

  protected abstract service: MantenedorGestionAbstractService<T>;
  protected abstract dialogService: MatDialog;

  public cargandoItems$: Observable<boolean>;
  public ocupado$: Observable<boolean>;
  public items$: Observable<T[]>;

  ngOnInit() {
    this.cargandoItems$ = this.service.cargandoItems$.pipe();
    this.ocupado$ = this.service.focusedItems$.pipe(map(items => items.length === 0));
    this.items$ = this.service.items$.pipe();

    this.onCargar();
  }

  public abstract abrirDialogoEdicion(item: T): Observable<T>;

  protected editar(item: T): Observable<T> {
    return this.abrirDialogoEdicion(item).pipe(
      finalize(() => { this.onCargar(); })
    );
  }

  public onCargar(): void {
    this.service.recargarItems();
  }

  public onClickEditar(item: T): void {
    this.editar(item).subscribe();
  }

  public onClickAgregar(): void {
    this.editar(undefined).subscribe();
  }

  public onClickBorrar(item: T): void {
    throw Error('Operación no soportada.');
  }

}
