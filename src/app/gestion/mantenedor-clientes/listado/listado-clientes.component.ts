import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ListadoGestionComponent } from 'src/app/gestion/listado-gestion.abstract-component';
import { Cliente } from 'src/models/entities/Cliente';
import { MantenedorClientesGestionService } from '../mantenedor-clientes.service';

@Component({
  selector: 'app-listado-clientes-gestion',
  templateUrl: './listado-clientes.component.html',
  styleUrls: [
    '../../../../assets/styles/formularios.css',
    './listado-clientes.component.css'
  ]
})
export class ListadoClientesGestionComponent
  extends ListadoGestionComponent<Cliente>  {

  public columnasTabla: string[] = [ 'nombre', 'rut' ];

  constructor(
    protected service: MantenedorClientesGestionService
  ) {
    super();
  }
}
