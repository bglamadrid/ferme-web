import { NgModule } from '@angular/core';
import { SERVICE_ALIASES } from '../service-aliases';
import { ClientesLocalMemoryDataService } from './clientes.local-memory-data.service';
import { EmpleadosLocalMemoryDataService } from './empleados.local-memory-data.service';
import { OrdenCompraLocalMemoryDataService } from './ordenes_compra.local-memory-data.service';
import { ProductosLocalMemoryDataService } from './productos.local-memory-data.service';
import { ProveedoresLocalMemoryDataService } from './proveedores.local-memory-data.service';
import { UsuariosLocalMemoryDataService } from './usuarios.local-memory-data.service';
import { VentasLocalMemoryDataService } from './ventas.local-memory-data.service';

@NgModule({
  providers: [
    { provide: SERVICE_ALIASES.auth, useClass: AuthHttpDataService },
    { provide: SERVICE_ALIASES.clients, useClass: ClientesLocalMemoryDataService },
    { provide: SERVICE_ALIASES.employees, useClass: EmpleadosLocalMemoryDataService },
    { provide: SERVICE_ALIASES.purchaseOrders, useClass: OrdenCompraLocalMemoryDataService },
    { provide: SERVICE_ALIASES.products, useClass: ProductosLocalMemoryDataService },
    { provide: SERVICE_ALIASES.providers, useClass: ProveedoresLocalMemoryDataService },
    { provide: SERVICE_ALIASES.shared, useClass: SharedHttpDataService },
    { provide: SERVICE_ALIASES.users, useClass: UsuariosLocalMemoryDataService },
    { provide: SERVICE_ALIASES.sales, useClass: VentasLocalMemoryDataService }
  ]
})
export class LocalMemoryDataModule { }
