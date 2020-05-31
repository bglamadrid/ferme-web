import { DetalleVenta } from './DetalleVenta';
import { AbstractEntity } from '../AbstractEntity';

export class Venta
  extends AbstractEntity {

  public id: number;

  public tipoVenta: string;
  public fechaVenta: string;
  public subtotalVenta: number;
  public detallesVenta: DetalleVenta[];
  public idEmpleado: number;
  public idCliente: number;
  public nombreCompletoPersonaEmpleado?: string;
  public rutPersonaEmpleado?: string;
  public nombreCompletoPersonaCliente?: string;
  public rutPersonaCliente?: string;
}
