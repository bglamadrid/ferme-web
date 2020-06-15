import { Inject, Injectable } from '@angular/core';
import { CompositeEntityDataService } from 'src/data/composite-entity.data.iservice';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';
import { DetalleVenta } from 'src/models/entities/DetalleVenta';
import { Venta } from 'src/models/entities/Venta';
import { MantenedorGestionAbstractService } from '../mantenedor-gestion.abstract-service';

@Injectable()
export class MantenedorVentasGestionService
  extends MantenedorGestionAbstractService<Venta> {

  constructor(
    @Inject(DATA_SERVICE_ALIASES.sales) protected dataService: CompositeEntityDataService<Venta, DetalleVenta>
  ) {
    super();
  }
}
