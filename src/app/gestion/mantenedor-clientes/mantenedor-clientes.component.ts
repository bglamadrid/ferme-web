import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Cliente } from 'src/models/entities/Cliente';
import { MantenedorGestionAbstractComponent } from '../mantenedor-gestion.abstract-component';
import { MantenedorClientesGestionService } from './mantenedor-clientes.service';

@Component({
  selector: 'app-mantenedor-clientes-gestion',
  templateUrl: './mantenedor-clientes.component.html',
  styleUrls: [
    '../../../assets/styles/navegadores.css'
  ]
})
export class MantenedorClientesGestionComponent
  extends MantenedorGestionAbstractComponent<Cliente> {

  public columnasTabla: string[] = [ 'nombre', 'rut' ];

  constructor(
    protected service: MantenedorClientesGestionService,
    protected dialogService: MatDialog
  ) {
    super();
  }

  public abrirDialogoEdicion(item: Cliente): Observable<Cliente> {
    throw new Error('Method not implemented.');
  }

}
