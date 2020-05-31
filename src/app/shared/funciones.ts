import { DetalleVenta } from 'src/models/entities/DetalleVenta';
import { Producto } from 'src/models/entities/Producto';

export function crearDetalleVentaDesdeProducto(prod: Producto): DetalleVenta {
    const detalleConEsteProducto = new DetalleVenta();
    detalleConEsteProducto.unidadesProducto = 1;
    detalleConEsteProducto.idProducto = prod.id;
    detalleConEsteProducto.nombreProducto = prod.nombre;
    detalleConEsteProducto.codigoProducto = prod.codigoProducto;
    detalleConEsteProducto.precioProducto = prod.precioProducto;
    return detalleConEsteProducto;
}
