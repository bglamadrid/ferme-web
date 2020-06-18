import { Observable } from 'rxjs';
import { EntityDataService } from './entity.data.iservice';

export interface CompositeEntityDataService<T, X>
  extends EntityDataService<T> {

  readDetailsById(id: number): Observable<X[]>;
}
