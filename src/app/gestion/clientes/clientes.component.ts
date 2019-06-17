import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Cliente } from 'src/models/Cliente';
import { ClientesListadoComponent } from './listado/listado.component';
import { ClientesHttpService } from 'src/http-services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: [
    '../gestion-pages.css'
  ]
})
export class ClientesComponent implements OnInit {

  public clientes$: Observable<Cliente[]>;
  public loading$: Observable<boolean>;

  @ViewChild("listado") public listado: ClientesListadoComponent;

  constructor(
    private httpSvc: ClientesHttpService
  ) { 
    this.loading$ = of(true);
  }

  ngOnInit() {
    this.cargarClientes();
  }

  private cargarClientes(): Observable<Cliente[]> {
    let clientes: Observable<Cliente[]> = this.httpSvc.listarClientes();
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
