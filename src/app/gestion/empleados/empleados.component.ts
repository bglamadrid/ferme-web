import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Empleado } from 'src/models/Empleado';
import { EmpleadosService } from './empleados.service';
import { EmpleadosListadoComponent } from './listado/listado.component';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  public empleados$: Observable<Empleado[]>;
  public loading$: Observable<boolean> = of(true);

  @ViewChild("listado") public listado: EmpleadosListadoComponent;

  constructor(
    private localSvc: EmpleadosService
  ) { }

  ngOnInit() {
    this.cargarEmpleados();
  }

  private cargarEmpleados(): Observable<Empleado[]> {
    let empleados: Observable<Empleado[]> = this.localSvc.listarEmpleados();
    empleados.subscribe((payload: Empleado[]) => {
      this.empleados$ = of(payload);
    }, err => {
      this.empleados$ = of([]);
    }, () => {
      this.loading$ = of(false);
    });
    return from(empleados);
  }

  public onClickAgregarEmpleado(): void {
    
  }

}
