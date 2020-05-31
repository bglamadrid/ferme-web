import { Injectable } from '@angular/core';
import { EntityLocalMemoryDataService } from './local-memory-data.abstract-service';
import { Producto } from 'src/models/entities/Producto';

export const MOCK_PRODUCTS: Partial<Producto>[] = [
  {
    id: 1,
    idTipoProducto: 1,
    idFamiliaProducto: 1,
    nombre: 'Producto de ejemplo 1',
    descripcionTipoProducto: 'Productos de ejemplo',
    precioProducto: 5000
  }
];

@Injectable()
export class ProductosLocalMemoryDataService
  extends EntityLocalMemoryDataService<Producto> {

  constructor() {
    super();
    this.items = MOCK_PRODUCTS.map(n => Object.assign(new Producto(), n));
  }
}
