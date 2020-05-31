import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MSJ_ERROR_COMM_SRV } from 'src/app/shared/constantes';
import { EntityDataService } from 'src/data/entity.data.iservice';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';
import { Empleado } from 'src/models/entities/Empleado';
import { MantenedorGestionComponent } from '../mantenedor-gestion.abstract-component';
import { EmpleadoFormDialogGestionComponent, EmpleadoFormDialogGestionData } from './form-dialog/empleado-form-dialog.component';
import { ListadoEmpleadosGestionComponent } from './listado/listado-empleados.component';

@Component({
  selector: 'app-mantenedor-empleados-gestion',
  templateUrl: './mantenedor-empleados.component.html',
  styleUrls: [
    '../../../assets/styles/navegadores.css'
  ]
})
export class MantenedorEmpleadosGestionComponent
  extends MantenedorGestionComponent<Empleado> {

  @ViewChild('listado', { static: true }) public listado: ListadoEmpleadosGestionComponent;

  constructor(
    @Inject(DATA_SERVICE_ALIASES.employees) protected httpSvc: EntityDataService<Empleado>,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) {
    super();
  }

  public cargarItems(): Observable<Empleado[]> {
    return this.httpSvc.readAll();
  }

  public abrirDialogoEdicion(item: Empleado): Observable<Empleado> {

    const dialogConfig: MatDialogConfig = {
      width: '40rem'
    };

    if (item) {
      const dialogData: EmpleadoFormDialogGestionData = { empleado: item };
      dialogConfig.data = dialogData;
    }

    const dialog = this.dialog.open(EmpleadoFormDialogGestionComponent, dialogConfig);

    return from(dialog.afterClosed());
  }

  public onClickBorrar(emp: Empleado) {
    this.ocupadoSource.next(true);
    this.httpSvc.deleteById(emp.id).pipe(
      finalize(() => { this.ocupadoSource.next(false); })
    ).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBar.open('Empleado \'' + emp.nombre + '\' eliminado.');
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
