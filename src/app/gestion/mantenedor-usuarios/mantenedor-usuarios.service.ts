import { Injectable, Inject } from '@angular/core';
import { MantenedorGestionAbstractService } from '../mantenedor-gestion.abstract-service';
import { Usuario } from 'src/models/entities/Usuario';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';
import { EntityDataService } from 'src/data/entity.data.iservice';

@Injectable()
export class MantenedorUsuariosGestionService
  extends MantenedorGestionAbstractService<Usuario> {

  constructor(
    @Inject(DATA_SERVICE_ALIASES.users) protected dataService: EntityDataService<Usuario>
  ) {
    super();
  }
}
