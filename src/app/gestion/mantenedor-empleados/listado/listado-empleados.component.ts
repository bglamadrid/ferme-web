import { Component } from '@angular/core';
import { ListadoGestionComponent } from 'src/app/gestion/listado-gestion.abstract-component';
import { Empleado } from 'src/models/entities/Empleado';
import { MantenedorEmpleadosGestionService } from '../mantenedor-empleados.service';

@Component({
  selector: 'app-listado-empleados-gestion',
  templateUrl: './listado-empleados.component.html',
  styleUrls: [
    '../../../../assets/styles/formularios.css',
    './listado-empleados.component.css'
  ]
})
export class ListadoEmpleadosGestionComponent
  extends ListadoGestionComponent<Empleado> {

  public columnasTabla: string[] = [ 'nombre', 'rut', 'acciones' ];

  constructor(
    protected service: MantenedorEmpleadosGestionService
  ) {
    super();
  }
}
