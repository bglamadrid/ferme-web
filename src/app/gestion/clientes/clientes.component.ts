import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Cliente } from 'src/models/Cliente';
import { ClientesService } from './clientes.service';
import { ClientesListadoComponent } from './listado/listado.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public clientes$: Observable<Cliente[]>;
  public loading$: Observable<boolean> = of(true);

  @ViewChild("listado") public listado: ClientesListadoComponent;

  constructor(
    private localSvc: ClientesService
  ) { }

  ngOnInit() {
    this.cargarClientes();
  }

  private cargarClientes(): Observable<Cliente[]> {
    let clientes: Observable<Cliente[]> = this.localSvc.listarClientes();
    clientes.subscribe((payload: Cliente[]) => {
      this.clientes$ = of(payload);
    }, err => {
      this.clientes$ = of([]);
    }, () => {
      this.loading$ = of(false);
    });
    return from(clientes);
  }

  
}
