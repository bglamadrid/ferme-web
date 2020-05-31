import { AbstractEntity } from '../AbstractEntity';

export class Producto extends AbstractEntity {
  public id: number;
  public nombreProducto: string;
  public descripcionProducto: string;
  public precioProducto: number;
  public stockActualProducto: number;
  public stockCriticoProducto: number;
  public idTipoProducto: number;
  public codigoProducto?: string;
  public descripcionTipoProducto?: string;
  public idFamiliaProducto?: number;
  public descripcionFamiliaProducto?: string;
}
