import { NgModule } from '@angular/core';
import { DATA_SERVICE_ALIASES } from '../data.service-aliases';
import { AuthHttpDataService } from './auth.http-data.service';
import { ClientesHttpDataService } from './clientes.http-data.service';
import { EmpleadosHttpDataService } from './empleados.http-data.service';
import { OrdenesCompraHttpDataService } from './ordenes_compra.http-data.service';
import { ProductosHttpDataService } from './productos.http-data.service';
import { ProveedoresHttpDataService } from './proveedores.http-data.service';
import { SharedHttpDataService } from './shared.http-data.service';
import { UsuariosHttpDataService } from './usuarios.http-data.service';
import { VentasHttpDataService } from './ventas.http-data.service';

@NgModule({
  providers: [
    { provide: DATA_SERVICE_ALIASES.auth, useClass: AuthHttpDataService },
    { provide: DATA_SERVICE_ALIASES.clients, useClass: ClientesHttpDataService },
    { provide: DATA_SERVICE_ALIASES.employees, useClass: EmpleadosHttpDataService },
    { provide: DATA_SERVICE_ALIASES.purchaseOrders, useClass: OrdenesCompraHttpDataService },
    { provide: DATA_SERVICE_ALIASES.products, useClass: ProductosHttpDataService },
    { provide: DATA_SERVICE_ALIASES.providers, useClass: ProveedoresHttpDataService },
    { provide: DATA_SERVICE_ALIASES.shared, useClass: SharedHttpDataService },
    { provide: DATA_SERVICE_ALIASES.users, useClass: UsuariosHttpDataService },
    { provide: DATA_SERVICE_ALIASES.sales, useClass: VentasHttpDataService }
  ]
})
export class HttpDataModule { }
