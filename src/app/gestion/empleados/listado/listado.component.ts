import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTable } from '@angular/material';
import { of } from 'rxjs';
import { Empleado } from 'src/models/Empleado';

@Component({
  selector: 'app-empleados-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class EmpleadosListadoComponent implements OnInit {

  @ViewChild("tabla") public tabla: MatTable<Empleado>;
  public displayedColumns: string[] = [ "nombre", "rut" ];

  @Input() public set Empleados(empleados: Empleado[]) {
    this.tabla.dataSource = of(empleados);
  }

  constructor() { }

  ngOnInit() {
  }

}
