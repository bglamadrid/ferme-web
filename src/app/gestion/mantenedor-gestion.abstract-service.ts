import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { delay, finalize, mergeMap, tap, toArray } from 'rxjs/operators';
import { EntityDataService } from 'src/data/entity.data.iservice';
import { AbstractEntity } from 'src/models/AbstractEntity';

export abstract class MantenedorGestionAbstractService<T extends AbstractEntity> {

  protected abstract dataService: EntityDataService<T>;

  protected currentFocusedItems: T[];
  protected focusedItemsSource: Subject<T[]> = new BehaviorSubject([]);
  protected itemsSource: Subject<T[]> = new Subject();
  protected cargandoItemsSource: Subject<boolean> = new BehaviorSubject(false);

  public focusedItems$: Observable<T[]> = this.focusedItemsSource.asObservable();
  public cargandoItems$: Observable<boolean> = this.cargandoItemsSource.asObservable();
  public items$: Observable<T[]> = this.itemsSource.asObservable();

  public get focusedItems(): T[] {
    return this.currentFocusedItems;
  }
  public set focusedItems(i: T[]) {
    this.currentFocusedItems = i;
    this.focusedItemsSource.next(i);
  }

  public recargarItems(): void {
    this.dataService.readAll().pipe(
      delay(0),
      tap(items => this.itemsSource.next(items)),
      finalize(() => { this.cargandoItemsSource.next(false); })
    ).subscribe();
  }

  public eliminarItems(items: T[]): Observable<boolean[]> {
    this.focusedItems = items;
    return from(items).pipe(
      mergeMap(
        item => this.dataService.deleteById(item.id).pipe(
          map(result => result)
        )
      ),
      toArray(),
      map(results => results),
      finalize(() => { this.focusedItems = []; })
    );
  }


}
