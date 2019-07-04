import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from, Subject } from 'rxjs';
import { Empleado } from 'src/modelo/Empleado';
import { EmpleadosListadoComponent } from './listado/listado.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EmpleadoFormularioComponent, EmpleadoFormularioDialogData } from './formulario/formulario.component';
import { EmpleadosHttpService } from 'src/http-services/empleados.service';
import { ActivatedRoute } from '@angular/router';
import { SNACKBAR_WARNING } from 'src/app/compartido/constantes';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css',
    './empleados.component.css'
  ]
})
export class EmpleadosComponent implements OnInit {

  private _empleados: Empleado[];
  private _empleadosSource: Subject<Empleado[]>;
  public empleados$: Observable<Empleado[]>;

  private _loadingSource: Subject<boolean>;
  public loading$: Observable<boolean>;

  private _busySource: Subject<boolean>;
  public busy$: Observable<boolean>;

  @ViewChild("listado") public listado: EmpleadosListadoComponent;

  constructor(
    private httpSvc: EmpleadosHttpService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { 
    this._empleados = [];
    this._empleadosSource = new Subject<Empleado[]>();
    this.empleados$ = this._empleadosSource.asObservable();

    this._loadingSource = new Subject<boolean>();
    this.loading$ = this._loadingSource.asObservable();

    this._busySource = new Subject<boolean>();
    this.busy$ = this._busySource.asObservable();
  }

  ngOnInit() {
    this.cargarEmpleados();
    
  }

  private cargarEmpleados(): Observable<Empleado[]> {
    this._loadingSource.next(true);
    let empleados: Observable<Empleado[]> = this.httpSvc.listarEmpleados();
    empleados.subscribe((payload: Empleado[]) => {
      this._empleados = payload;
      this._empleadosSource.next(payload);
    }, err => {
      console.log(err);
      this._empleados = [];
      this._empleadosSource.next([]);
    }, () => {
      this._loadingSource.next(false);
      this._busySource.next(false);
    });
    return from(empleados);
  }

  public onClickAgregar(): void {
    this._busySource.next(true);
    this.dialog.open(EmpleadoFormularioComponent, {
      width: "40rem",
      height: "29rem"
    }).afterClosed().subscribe(
      (nuevo: Empleado) => {
        if (nuevo) {
          this.cargarEmpleados();
        }
      },
      err => { console.log(err); },
      () => { this._busySource.next(false); }
    );
  }

  public onClickEditar(emp: Empleado): void {
    this._busySource.next(true);

    const dialogData: EmpleadoFormularioDialogData = {
      empleado: emp
    };

    this.dialog.open(EmpleadoFormularioComponent, {
      width: "40rem",
      height: "28rem",
      data: dialogData
    }).afterClosed().subscribe(
      (editado: Empleado) => {
        if (editado) {
          this.cargarEmpleados();
        }
      },
      err => { console.log(err); },
      () => { this._busySource.next(false); }
    );
  }

  public onClickBorrar(emp: Empleado) {
    this._busySource.next(true);
    this.httpSvc.borrarEmpleado(emp.idEmpleado).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open("Empleado '"+emp.nombreCompletoPersona+"' eliminado.");
          this.cargarEmpleados();
        } else {
          this.snackBar.open("Hubo un problema al borrar el empleado.");
        }
      },
      err => { 
        this.snackBar.open("Hubo un problema de comunicación con el servidor. Por favor, inténtelo nuevamente.", undefined, SNACKBAR_WARNING);
        console.log(err);
       },
       () => { this._busySource.next(false); }
    );
  }

}
