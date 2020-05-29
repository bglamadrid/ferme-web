import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { crearDetalleVentaDesdeProducto } from 'src/app/shared/funciones';
import { DetalleVenta } from 'src/models/entities/DetalleVenta';
import { Producto } from 'src/models/entities/Producto';
import { Venta } from 'src/models/entities/Venta';

@Injectable({ providedIn: 'root' })
export class CompraService {

  protected detalles: DetalleVenta[];
  protected detallesSource: BehaviorSubject<DetalleVenta[]>;

  public detalles$: Observable<DetalleVenta[]>;

  constructor(

  ) {
    this.reset();
  }

  public reset(): void {
    this.detalles = [];
    this.detallesSource = new BehaviorSubject<DetalleVenta[]>([]);
    this.detalles$ = this.detallesSource.asObservable();
  }

  private obtenerIndiceDetallesVentaSegunProducto(prod: Producto): number {
    return this.detalles.findIndex(d => d.idProducto === prod.id);
  }

  public agregarProducto(prod: Producto): void {
    let indice: number = this.obtenerIndiceDetallesVentaSegunProducto(prod);

    let detalleConEsteProducto: DetalleVenta;
    if (indice !== -1) {
      detalleConEsteProducto = this.detalles[indice];
      detalleConEsteProducto.unidadesProducto++;
    } else {
      detalleConEsteProducto = crearDetalleVentaDesdeProducto(prod);
      indice = this.detalles.push(detalleConEsteProducto);
      indice--;
    }

    this.detallesSource.next(this.detalles);
  }

  public incrementarUnidadesProducto(indice: number): void {
    if (indice !== -1) {
      const detalleConEsteProducto = this.detalles[indice];
      detalleConEsteProducto.unidadesProducto++;

      this.detallesSource.next(this.detalles);
    }
  }

  public reducirUnidadesProducto(indice: number): void {
    if (indice !== -1) {
      const detalleConEsteProducto = this.detalles[indice];
      detalleConEsteProducto.unidadesProducto--;

      this.detallesSource.next(this.detalles);
    }
  }

  public quitarProducto(indice: number): void {
    if (indice !== -1) {
      this.detalles.splice(indice, 1);
      this.detallesSource.next(this.detalles);
    }
  }

  public generarVentaConCliente(idCliente: number): Venta {
    const venta: Venta = new Venta();
    venta.idCliente = idCliente;
    venta.detallesVenta = this.detalles;
    venta.tipoVenta = 'B';
    venta.fechaVenta = (new Date()).toLocaleDateString();
    return venta;
  }
}
