import { NgModule } from '@angular/core';
import { SERVICE_ALIASES } from '../service-aliases';
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
    { provide: SERVICE_ALIASES.auth, useClass: AuthHttpDataService },
    { provide: SERVICE_ALIASES.clients, useClass: ClientesHttpDataService },
    { provide: SERVICE_ALIASES.employees, useClass: EmpleadosHttpDataService },
    { provide: SERVICE_ALIASES.purchaseOrders, useClass: OrdenesCompraHttpDataService },
    { provide: SERVICE_ALIASES.products, useClass: ProductosHttpDataService },
    { provide: SERVICE_ALIASES.providers, useClass: ProveedoresHttpDataService },
    { provide: SERVICE_ALIASES.shared, useClass: SharedHttpDataService },
    { provide: SERVICE_ALIASES.users, useClass: UsuariosHttpDataService },
    { provide: SERVICE_ALIASES.sales, useClass: VentasHttpDataService }
  ]
})
export class HttpDataModule { }
