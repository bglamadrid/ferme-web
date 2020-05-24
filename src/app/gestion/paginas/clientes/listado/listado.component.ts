import { Component, Input, ViewChild } from '@angular/core';
import { Cliente } from 'src/modelo/Cliente';
import { of } from 'rxjs';
import { MatTable } from '@angular/material/table';
import { ListadoGestionComponent } from 'src/app/gestion/compartido/listado/listado.component';

@Component({
  selector: 'app-clientes-listado',
  templateUrl: './listado.component.html',
  styleUrls: [
    '../../../compartido/formularios.css',
    './listado.component.css'
  ]
})
export class ClientesListadoComponent 
  extends ListadoGestionComponent<Cliente>  {

  @ViewChild("tabla", { static: true }) public tabla: MatTable<Cliente>;

  constructor(
    
  ) { 
    super();
    this.columnasTabla = [ "nombre", "rut" ];
  }
}
