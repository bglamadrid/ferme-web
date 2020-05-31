import { AbstractEntity } from '../AbstractEntity';

export class DetalleVenta
  extends AbstractEntity {

  public id: number;

  public idVenta: number;
  public idProducto: number;
  public unidadesProducto: number;
  public montoDetalleVenta?: number;
  public nombreProducto?: string;
  public codigoProducto?: string;
  public precioProducto?: number;
}
