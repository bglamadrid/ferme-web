import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ClientesHttpService } from 'src/http-services/clientes-http.service';
import { Cliente } from 'src/models/Cliente';
import { MantenedorGestionComponent } from '../mantenedor-gestion.abstract-component';
import { ListadoClientesGestionComponent } from './listado/listado-clientes.component';

@Component({
  selector: 'app-mantenedor-clientes-gestion',
  templateUrl: './mantenedor-clientes.component.html',
  styleUrls: [
    '../../../assets/styles/navegadores.css'
  ]
})
export class MantenedorClientesGestionComponent
  extends MantenedorGestionComponent<Cliente> {

  @ViewChild('listado', { static: true }) public listado: ListadoClientesGestionComponent;

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
