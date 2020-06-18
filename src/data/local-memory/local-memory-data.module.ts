import { NgModule } from '@angular/core';
import { DATA_SERVICE_ALIASES } from '../data.service-aliases';
import { AuthLocalMemoryDataService } from './auth.local-memory-data.service';
import { ClientesLocalMemoryDataService } from './clientes.local-memory-data.service';
import { EmpleadosLocalMemoryDataService } from './empleados.local-memory-data.service';
import { OrdenCompraLocalMemoryDataService } from './ordenes_compra.local-memory-data.service';
import { ProductosLocalMemoryDataService } from './productos.local-memory-data.service';
import { ProveedoresLocalMemoryDataService } from './proveedores.local-memory-data.service';
import { SharedLocalMemoryDataService } from './shared.local-memory-data.service';
import { UsuariosLocalMemoryDataService } from './usuarios.local-memory-data.service';
import { VentasLocalMemoryDataService } from './ventas.local-memory-data.service';

@NgModule({
  providers: [
    { provide: DATA_SERVICE_ALIASES.auth, useClass: AuthLocalMemoryDataService },
    { provide: DATA_SERVICE_ALIASES.clients, useClass: ClientesLocalMemoryDataService },
    { provide: DATA_SERVICE_ALIASES.employees, useClass: EmpleadosLocalMemoryDataService },
    { provide: DATA_SERVICE_ALIASES.purchaseOrders, useClass: OrdenCompraLocalMemoryDataService },
    { provide: DATA_SERVICE_ALIASES.products, useClass: ProductosLocalMemoryDataService },
    { provide: DATA_SERVICE_ALIASES.providers, useClass: ProveedoresLocalMemoryDataService },
    { provide: DATA_SERVICE_ALIASES.shared, useClass: SharedLocalMemoryDataService },
    { provide: DATA_SERVICE_ALIASES.users, useClass: UsuariosLocalMemoryDataService },
    { provide: DATA_SERVICE_ALIASES.sales, useClass: VentasLocalMemoryDataService }
  ]
})
export class LocalMemoryDataModule { }
