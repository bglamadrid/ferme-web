import { Inject, Injectable } from '@angular/core';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';
import { EntityDataService } from 'src/data/entity.data.iservice';
import { Producto } from 'src/models/entities/Producto';
import { MantenedorGestionAbstractService } from '../mantenedor-gestion.abstract-service';

@Injectable()
export class MantenedorProductosGestionService
  extends MantenedorGestionAbstractService<Producto> {

  constructor(
    @Inject(DATA_SERVICE_ALIASES.products) protected dataService: EntityDataService<Producto>
  ) {
    super();
  }
}
