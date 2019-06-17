import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTable } from '@angular/material';
import { of, Observable } from 'rxjs';
import { Proveedor } from 'src/models/Proveedor';

@Component({
  selector: 'app-proveedores-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ProveedoresListadoComponent {

  @Output() public editar: EventEmitter<Proveedor>;
  @Output() public borrar: EventEmitter<Proveedor>;

  @ViewChild("tabla") public tabla: MatTable<Proveedor>;
  public displayedColumns: string[];

  constructor(

  ) { 
    this.displayedColumns = [ "nombre", "rut", "acciones" ];
    this.editar = new EventEmitter();
    this.borrar = new EventEmitter();
  }

  public onClickVerProveedor(prov: Proveedor) {
    this.editar.emit(prov);
  }

  public onClickBorrarProveedor(prov: Proveedor) {
    this.borrar.emit(prov);
  }

  @Input() public busy$: Observable<boolean>;
  @Input() public set Proveedores(proveedores: Proveedor[]) {
    this.tabla.dataSource = proveedores? of(proveedores) : of([]);
  }
}
