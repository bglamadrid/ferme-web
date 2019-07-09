import { DetalleVenta } from 'src/modelo/DetalleVenta';
import { Producto } from 'src/modelo/Producto';

export function crearDetalleVentaDesdeProducto(prod: Producto): DetalleVenta {
    let detalleConEsteProducto = new DetalleVenta();
    detalleConEsteProducto.unidadesProducto = 1;
    detalleConEsteProducto.idProducto = prod.idProducto;
    detalleConEsteProducto.nombreProducto = prod.nombreProducto;
    detalleConEsteProducto.codigoProducto = prod.codigoProducto;
    detalleConEsteProducto.precioProducto = prod.precioProducto;
    return detalleConEsteProducto;
}