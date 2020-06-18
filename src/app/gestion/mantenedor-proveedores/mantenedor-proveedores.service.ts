import { Inject, Injectable } from '@angular/core';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';
import { EntityDataService } from 'src/data/entity.data.iservice';
import { Proveedor } from 'src/models/entities/Proveedor';
import { MantenedorGestionAbstractService } from '../mantenedor-gestion.abstract-service';

@Injectable()
export class MantenedorProveedoresGestionService
  extends MantenedorGestionAbstractService<Proveedor> {

  constructor(
    @Inject(DATA_SERVICE_ALIASES.providers) protected dataService: EntityDataService<Proveedor>
  ) {
    super();
  }
}
