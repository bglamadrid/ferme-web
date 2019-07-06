import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from, Subject, BehaviorSubject } from 'rxjs';
import { Empleado } from 'src/modelo/Empleado';
import { EmpleadosListadoComponent } from './listado/listado.component';
import { MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { EmpleadoFormularioComponent, EmpleadoFormularioDialogData } from './formulario/formulario.component';
import { EmpleadosHttpService } from 'src/http-services/empleados.service';
import { ActivatedRoute } from '@angular/router';
import { SNACKBAR_WARNING } from 'src/app/compartido/constantes';
import { MantenedorGestionComponent } from '../../compartido/mantenedor/mantenedor.component';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css',
    './empleados.component.css'
  ]
})
export class EmpleadosComponent 
  extends MantenedorGestionComponent<Empleado> {

  @ViewChild("listado") public listado: EmpleadosListadoComponent;

  constructor(
    protected httpSvc: EmpleadosHttpService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) { 
    super();
  }

  public cargarItems(): Observable<Empleado[]> {
    return this.httpSvc.listarEmpleados();
  }

  public abrirDialogoEdicion(item: Empleado): Observable<Empleado> {

    let dialogConfig: MatDialogConfig = {
      width: "80rem",
      height: "28rem"
    };

    if (item) {
      let dialogData: EmpleadoFormularioDialogData = { empleado: item };
      dialogConfig.data = dialogData;
    }
    
    let dialog = this.dialog.open(EmpleadoFormularioComponent, dialogConfig);
    
    return from(dialog.afterClosed());
  }

  public onClickBorrar(emp: Empleado) {
    this._ocupado$.next(true);
    this.httpSvc.borrarEmpleado(emp.idEmpleado).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open("Empleado '"+emp.nombreCompletoPersona+"' eliminado.");
          this.onCargar();
        } else {
          this.snackBar.open("Hubo un problema al borrar el empleado.");
        }
      },
      err => { 
        this.snackBar.open("Hubo un problema de comunicación con el servidor. Por favor, inténtelo nuevamente.", undefined, SNACKBAR_WARNING);
        console.log(err);
       },
       () => { this._ocupado$.next(false); }
    );
  }

}
