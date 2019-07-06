import { Observable, BehaviorSubject } from 'rxjs';
import { ListadoGestion } from '../listado/listado.interface';
import { RootHttpService } from 'src/http-services/root.service';

export interface MantenedorGestion<T> {
  
  items$: Observable<T[]>;
  ocupado$: Observable<boolean>;
  cargandoItems: boolean;

  listado: ListadoGestion<T>;

  cargarItems(): void;

  abrirDialogoEdicion(item: T): void;
  
  onCargar(): void;
  onClickAgregar(): void;
  onClickEditar(item: T): void;
  onClickBorrar(item: T): void;
}
