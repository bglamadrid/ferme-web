import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MSJ_ERROR_COMM_SRV } from 'src/app/compartido/constantes';
import { MantenedorGestionComponent } from 'src/app/gestion/compartido/mantenedor/mantenedor.component';
import { EmpleadosHttpService } from 'src/http-services/empleados-http.service';
import { Empleado } from 'src/modelo/Empleado';
import {
  EmpleadoFormularioDialogComponent,
  EmpleadoFormularioDialogData
} from '../../dialogos/formulario-empleado/formulario-empleado.component';
import { EmpleadosListadoComponent } from './listado/listado.component';

@Component({
  selector: 'app-gestion-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css'
  ]
})
export class GestionEmpleadosComponent
  extends MantenedorGestionComponent<Empleado> {

  @ViewChild('listado') public listado: EmpleadosListadoComponent;

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

    const dialogConfig: MatDialogConfig = {
      width: '40rem'
    };

    if (item) {
      const dialogData: EmpleadoFormularioDialogData = { empleado: item };
      dialogConfig.data = dialogData;
    }

    const dialog = this.dialog.open(EmpleadoFormularioDialogComponent, dialogConfig);

    return from(dialog.afterClosed());
  }

  public onClickBorrar(emp: Empleado) {
    this.ocupadoSource.next(true);
    this.httpSvc.borrarEmpleado(emp.idEmpleado).pipe(
      finalize(() => { this.ocupadoSource.next(false); })
    ).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open('Empleado \'' + emp.nombreCompletoPersona + '\' eliminado.');
          this.onCargar();
        } else {
          this.snackBar.open('Hubo un problema al borrar el empleado.');
        }
      },
      () => {
        this.snackBar.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
       }
    );
  }

}
