import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from, Subject, BehaviorSubject } from 'rxjs';
import { Cliente } from 'src/modelo/Cliente';
import { ClientesListadoComponent } from './listado/listado.component';
import { ClientesHttpService } from 'src/http-services/clientes.service';
import { MantenedorGestionComponent } from '../../compartido/mantenedor/mantenedor.component';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css'
  ]
})
export class ClientesComponent 
  extends MantenedorGestionComponent<Cliente> {

  @ViewChild("listado") public listado: ClientesListadoComponent;

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
