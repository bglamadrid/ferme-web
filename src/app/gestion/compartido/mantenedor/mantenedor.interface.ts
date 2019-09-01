import { Observable } from 'rxjs';
import { ListadoGestion } from '../listado/listado.interface';

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
