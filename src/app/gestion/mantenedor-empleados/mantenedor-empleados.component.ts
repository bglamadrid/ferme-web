import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from, Observable } from 'rxjs';
import { MSJ_ERROR_COMM_SRV } from 'src/app/shared/constantes';
import { Empleado } from 'src/models/entities/Empleado';
import { MantenedorGestionAbstractComponent } from '../mantenedor-gestion.abstract-component';
import { EmpleadoFormDialogGestionComponent, EmpleadoFormDialogGestionData } from './form-dialog/empleado-form-dialog.component';
import { MantenedorEmpleadosGestionService } from './mantenedor-empleados.service';

@Component({
  selector: 'app-mantenedor-empleados-gestion',
  templateUrl: './mantenedor-empleados.component.html',
  styleUrls: [
    '../../../assets/styles/navegadores.css'
  ]
})
export class MantenedorEmpleadosGestionComponent
  extends MantenedorGestionAbstractComponent<Empleado> {

  public columnasTabla: string[] = [ 'nombre', 'rut', 'acciones' ];

  constructor(
    protected service: MantenedorEmpleadosGestionService,
    protected dialogService: MatDialog,
    protected snackBarService: MatSnackBar
  ) {
    super();
  }

  public abrirDialogoEdicion(item: Empleado): Observable<Empleado> {

    const dialogConfig: MatDialogConfig = {
      width: '40rem'
    };

    if (item) {
      const dialogData: EmpleadoFormDialogGestionData = { empleado: item };
      dialogConfig.data = dialogData;
    }

    const dialog = this.dialogService.open(EmpleadoFormDialogGestionComponent, dialogConfig);

    return dialog.afterClosed();
  }

  public onClickBorrar(emp: Empleado) {
    this.service.eliminarItems([emp]).pipe(r => r[0]).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBarService.open('Empleado \'' + emp.nombre + '\' eliminado.');
          this.onCargar();
        } else {
          this.snackBarService.open('Hubo un problema al borrar el empleado.');
        }
      },
      () => {
        this.snackBarService.open(MSJ_ERROR_COMM_SRV, 'OK', { duration: -1 });
       }
    );
  }

}
