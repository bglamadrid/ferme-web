import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatTable } from '@angular/material';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { Empleado } from 'src/modelo/Empleado';
import { ListadoGestionComponent } from 'src/app/gestion/compartido/listado/listado.component';

@Component({
  selector: 'app-empleados-listado',
  templateUrl: './listado.component.html',
  styleUrls: [
    '../../../compartido/formularios.css',
    './listado.component.css'
  ]
})
export class EmpleadosListadoComponent extends ListadoGestionComponent implements OnInit {

  @Output() public editar: EventEmitter<Empleado>;
  @Output() public borrar: EventEmitter<Empleado>;

  @ViewChild("tabla") public tabla: MatTable<Empleado>;
  protected _items: Empleado[];
  protected _itemsSource: BehaviorSubject<Empleado[]>;
  public items$: Observable<Empleado[]>;

  constructor(

  ) { 
    super();
    this.editar = new EventEmitter<Empleado>();
    this.borrar = new EventEmitter<Empleado>();

    this._itemsSource = new BehaviorSubject<Empleado[]>([]);
    this.items$ = this._itemsSource.asObservable();

    this.displayedColumns = [ "nombre", "rut", "acciones" ];
  }

  ngOnInit() {
    this.tabla.dataSource = this.items$;
  }

  public onClickVer(emp: Empleado) {
    this.editar.emit(emp);
  }

  public onClickBorrar(emp: Empleado) {
    this.borrar.emit(emp);
  }
  
  @Input() public set Items(empleados: Empleado[]) {
    this._itemsSource.next(empleados);
  }
}
