import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { OrdenCompra } from 'src/modelo/OrdenCompra';
import { ListadoGestionComponent } from 'src/app/gestion/compartido/listado/listado.component';

@Component({
  selector: 'app-ordenes-compra-listado',
  templateUrl: './listado.component.html',
  styleUrls: [
    '../../../compartido/formularios.css',
    './listado.component.css'
  ]
})
export class OrdenesCompraListadoComponent 
  extends ListadoGestionComponent<OrdenCompra> {

  @ViewChild("tabla", { static: true }) public tabla: MatTable<OrdenCompra>;

  constructor(

  ) { 
    super();
    this.editar = new EventEmitter<OrdenCompra>();
    this.borrar = new EventEmitter<OrdenCompra>();

    this.columnasTabla = [ "numero", "fechaSolicitud", "fechaRecepcion", "acciones" ];
  }
}
