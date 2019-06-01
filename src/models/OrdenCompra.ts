import { DetalleOrdenCompra } from './DetalleOrdenCompra';

export class OrdenCompra {
    public idOrdenCompra: number;
    public idEmpleado: number;
    public estadoOrdenCompra: string;
    public fechaSolicitudOrdenCompra: string;
    public fechaRecepcionOrdenCompra: string;
    public detallesOrdenCompra: DetalleOrdenCompra[];
}