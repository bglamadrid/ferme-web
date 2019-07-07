import { Injectable } from '@angular/core';
import { DetalleVenta } from 'src/modelo/DetalleVenta';
import { Producto } from 'src/modelo/Producto';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  protected _detalles: DetalleVenta[];
  protected _detallesSource: Subject<DetalleVenta[]>;
  public detalles$: Observable<DetalleVenta[]>;

  constructor(

  ) { 
    this.reset();
  }

  public reset() {
    console.log("reset");
    
    this._detalles = [];
    this._detallesSource = new Subject<DetalleVenta[]>();
    this.detalles$ = this._detallesSource.asObservable();
  }

  private obtenerIndiceDetallesVentaSegunProducto(prod: Producto): number {
    return this._detalles.findIndex(d => d.idProducto === prod.idProducto);
  }

  public agregarProducto(prod: Producto): void {
    let detalleConEsteProducto: DetalleVenta;
    let indice: number = this.obtenerIndiceDetallesVentaSegunProducto(prod);
    
    if (indice !== -1) {
      detalleConEsteProducto = this._detalles[indice];
    } else {
      detalleConEsteProducto = new DetalleVenta();
      detalleConEsteProducto.unidadesProducto = 0;
      detalleConEsteProducto.idProducto = prod.idProducto;
      detalleConEsteProducto.nombreProducto = prod.nombreProducto;
      detalleConEsteProducto.precioProducto = prod.precioProducto;
      indice = this._detalles.push(detalleConEsteProducto);
      indice--;
    }

    detalleConEsteProducto.unidadesProducto++;

    this._detallesSource.next(this._detalles);
  }

  public reducirUnidadesProducto(prod: Producto): void {
    const indice: number = this.obtenerIndiceDetallesVentaSegunProducto(prod);
    
    if (indice !== -1) {
      const detalleConEsteProducto = this._detalles[indice];
      detalleConEsteProducto.unidadesProducto--;
  
      this._detallesSource.next(this._detalles);
    }
  }

  public quitarProducto(prod: Producto): void {
    const indice: number = this.obtenerIndiceDetallesVentaSegunProducto(prod);
    if (indice !== -1) {
      this._detalles.splice(indice, 1);
      this._detallesSource.next(this._detalles);
    }
  }
}
