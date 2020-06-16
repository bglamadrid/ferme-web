import { Injectable } from '@angular/core';
import { EntityLocalMemoryDataService } from './local-memory-data.abstract-service';
import { Producto } from 'src/models/entities/Producto';

export const MOCK_PRODUCTS: Partial<Producto>[] = [
  {
    id: 1,
    nombre: 'Producto de ejemplo 1',
    codigoProducto: '1111',
    precioProducto: 5000,
    stockActualProducto: 100,
    stockCriticoProducto: 10,
    idTipoProducto: 1,
    idFamiliaProducto: 1,
    descripcionTipoProducto: 'Productos de ejemplo'
  }
];

@Injectable()
export class ProductosLocalMemoryDataService
  extends EntityLocalMemoryDataService<Producto> {

  protected items: Producto[] = MOCK_PRODUCTS.map(n => Object.assign(new Producto(), n));

  constructor() {
    super();
  }
}
