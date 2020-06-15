import { Inject, Injectable } from '@angular/core';
import { CompositeEntityDataService } from 'src/data/composite-entity.data.iservice';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';
import { DetalleOrdenCompra } from 'src/models/entities/DetalleOrdenCompra';
import { OrdenCompra } from 'src/models/entities/OrdenCompra';
import { MantenedorGestionAbstractService } from '../mantenedor-gestion.abstract-service';

@Injectable()
export class MantenedorOrdenesCompraGestionService
  extends MantenedorGestionAbstractService<OrdenCompra> {

  constructor(
    @Inject(DATA_SERVICE_ALIASES.purchaseOrders) protected dataService: CompositeEntityDataService<OrdenCompra, DetalleOrdenCompra>
  ) {
    super();
  }
}
