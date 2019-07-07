import { Injectable } from '@angular/core';
import { DetalleVenta } from 'src/modelo/DetalleVenta';
import { Producto } from 'src/modelo/Producto';
import { BehaviorSubject, Observable } from 'rxjs';
import { Venta } from 'src/modelo/Venta';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  protected _detalles: DetalleVenta[];
  protected _detalles$: BehaviorSubject<DetalleVenta[]>;
  public detalles$: Observable<DetalleVenta[]>;

  constructor(

  ) { 
    this.reset();
  }

  public reset(): void {
    this._detalles = [];
    this._detalles$ = new BehaviorSubject<DetalleVenta[]>([]);
    this.detalles$ = this._detalles$.asObservable();
  }

  private obtenerIndiceDetallesVentaSegunProducto(prod: Producto): number {
    return this._detalles.findIndex(d => d.idProducto === prod.idProducto);
  }

  private crearDetalleVentaDesdeProducto(prod: Producto) {
    let detalleConEsteProducto = new DetalleVenta();
    detalleConEsteProducto.unidadesProducto = 1;
    detalleConEsteProducto.idProducto = prod.idProducto;
    detalleConEsteProducto.nombreProducto = prod.nombreProducto;
    detalleConEsteProducto.codigoProducto = prod.codigoProducto;
    detalleConEsteProducto.precioProducto = prod.precioProducto;
    return detalleConEsteProducto;
  }

  public agregarProducto(prod: Producto): void {
    let indice: number = this.obtenerIndiceDetallesVentaSegunProducto(prod);
    
    let detalleConEsteProducto: DetalleVenta;
    if (indice !== -1) {
      detalleConEsteProducto = this._detalles[indice];
      detalleConEsteProducto.unidadesProducto++;
    } else {
      detalleConEsteProducto = this.crearDetalleVentaDesdeProducto(prod);
      indice = this._detalles.push(detalleConEsteProducto);
      indice--;
    }

    this._detalles$.next(this._detalles);
  }

  public incrementarUnidadesProducto(indice: number): void {
    if (indice !== -1) {
      const detalleConEsteProducto = this._detalles[indice];
      detalleConEsteProducto.unidadesProducto++;
  
      this._detalles$.next(this._detalles);
    }
  }

  public reducirUnidadesProducto(indice: number): void {
    if (indice !== -1) {
      const detalleConEsteProducto = this._detalles[indice];
      detalleConEsteProducto.unidadesProducto--;
  
      this._detalles$.next(this._detalles);
    }
  }

  public quitarProducto(indice: number): void {
    if (indice !== -1) {
      this._detalles.splice(indice, 1);
      this._detalles$.next(this._detalles);
    }
  }

  public crearVenta(idCliente: number): Venta {
    let venta: Venta = new Venta();
    venta.idCliente = idCliente;
    venta.detallesVenta = this._detalles;
    venta.tipoVenta = 'B';
    venta.fechaVenta = (new Date()).toLocaleDateString();
    return venta;
  }
}
