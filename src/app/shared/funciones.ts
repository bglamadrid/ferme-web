import { DetalleVenta } from 'src/models/DetalleVenta';
import { Producto } from 'src/models/Producto';

export function crearDetalleVentaDesdeProducto(prod: Producto): DetalleVenta {
    const detalleConEsteProducto = new DetalleVenta();
    detalleConEsteProducto.unidadesProducto = 1;
    detalleConEsteProducto.idProducto = prod.idProducto;
    detalleConEsteProducto.nombreProducto = prod.nombreProducto;
    detalleConEsteProducto.codigoProducto = prod.codigoProducto;
    detalleConEsteProducto.precioProducto = prod.precioProducto;
    return detalleConEsteProducto;
}
