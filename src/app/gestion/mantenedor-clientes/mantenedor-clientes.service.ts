import { Injectable, Inject } from '@angular/core';
import { MantenedorGestionAbstractService } from '../mantenedor-gestion.abstract-service';
import { Cliente } from 'src/models/entities/Cliente';
import { EntityDataService } from 'src/data/entity.data.iservice';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';

@Injectable()
export class MantenedorClientesGestionService
  extends MantenedorGestionAbstractService<Cliente> {

  constructor(
    @Inject(DATA_SERVICE_ALIASES.clients) protected dataService: EntityDataService<Cliente>
  ) {
    super();
  }
}
