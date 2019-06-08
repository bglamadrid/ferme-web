import { Component, Input, ViewChild } from '@angular/core';
import { Cliente } from 'src/models/Cliente';
import { of } from 'rxjs';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-clientes-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ClientesListadoComponent {

  @ViewChild("tabla") public tabla: MatTable<Cliente>;
  public displayedColumns: string[];

  constructor(
    
  ) { 
    this.displayedColumns = [ "nombre", "rut" ];
  }

  @Input() public set Clientes(clientes: Cliente[]) {
    this.tabla.dataSource = clientes? of(clientes) : of([]);
  }

}
