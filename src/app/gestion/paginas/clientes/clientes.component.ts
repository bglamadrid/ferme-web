import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { ClientesHttpService } from 'src/http-services/clientes-http.service';
import { Cliente } from 'src/modelo/Cliente';
import { MantenedorGestionComponent } from '../../compartido/mantenedor/mantenedor.component';
import { ClientesListadoComponent } from './listado/listado.component';

@Component({
  selector: 'app-gestion-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css'
  ]
})
export class ClientesGestionComponent

  extends MantenedorGestionComponent<Cliente> {

  @ViewChild('listado') public listado: ClientesListadoComponent;

  constructor(
    protected httpSvc: ClientesHttpService,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) {
    super();

  }

  public cargarItems(): Observable<Cliente[]> {
    return this.httpSvc.listarClientes();
  }

}
