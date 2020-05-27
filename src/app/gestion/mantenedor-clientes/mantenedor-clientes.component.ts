import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { EntityDataService } from 'src/data/entity.data.iservice';
import { SERVICE_ALIASES } from 'src/data/service-aliases';
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
    @Inject(SERVICE_ALIASES.clients) protected httpSvc: EntityDataService<Cliente>,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar
  ) {
    super();

  }

  public cargarItems(): Observable<Cliente[]> {
    return this.httpSvc.readAll();
  }

}
