import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Cliente } from 'src/models/Cliente';
import { of } from 'rxjs';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-clientes-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ClientesListadoComponent implements OnInit {

  @ViewChild("tabla") public tabla: MatTable<Cliente>;
  public displayedColumns: string[] = [ "nombre", "rut" ];

  @Input() public set Clientes(clientes: Cliente[]) {
    this.tabla.dataSource = of(clientes);
  }

  constructor() { }

  ngOnInit() {
  }

}
