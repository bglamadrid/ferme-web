import { DetalleOrdenCompra } from './DetalleOrdenCompra';

export class OrdenCompra {
  public idOrdenCompra: number;
  public idEmpleado: number;
  public estadoOrdenCompra: string;
  public fechaSolicitudOrdenCompra: string;
  public fechaRecepcionOrdenCompra: string;
  public detallesOrdenCompra: DetalleOrdenCompra[];
  public nombreEmpleado?: string;
  public rutEmpleado?: string;
  public idProveedor?: number;
}
