import { Inject, Injectable } from '@angular/core';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';
import { EntityDataService } from 'src/data/entity.data.iservice';
import { Empleado } from 'src/models/entities/Empleado';
import { MantenedorGestionAbstractService } from '../mantenedor-gestion.abstract-service';

@Injectable()
export class MantenedorEmpleadosGestionService
  extends MantenedorGestionAbstractService<Empleado> {

  constructor(
    @Inject(DATA_SERVICE_ALIASES.employees) protected dataService: EntityDataService<Empleado>
  ) {
    super();
  }
}
