import { AbstractEntity } from '../AbstractEntity';

export class DetalleOrdenCompra
  extends AbstractEntity {

  public id: number;

  public idOrdenCompra: number;
  public idProducto: number;
  public cantidadProducto: number;
  public nombreProducto: string;
  public codigoProducto: string;
  public precioProducto: number;
}
