import { DetalleOrdenCompra } from './DetalleOrdenCompra';
import { AbstractEntity } from '../AbstractEntity';

export class OrdenCompra extends AbstractEntity {
  public id: number;
  public idEmpleado: number;
  public estadoOrdenCompra: string;
  public fechaSolicitudOrdenCompra: string;
  public fechaRecepcionOrdenCompra: string;
  public detallesOrdenCompra: DetalleOrdenCompra[];
  public nombreEmpleado?: string;
  public rutEmpleado?: string;
  public idProveedor?: number;
}
