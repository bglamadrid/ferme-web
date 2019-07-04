import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, from, Subject } from 'rxjs';
import { Cliente } from 'src/modelo/Cliente';
import { ClientesListadoComponent } from './listado/listado.component';
import { ClientesHttpService } from 'src/http-services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: [
    '../../compartido/mantenedores.css'
  ]
})
export class ClientesComponent implements OnInit {

  private _clientes: Cliente[];
  private _clientesSource: Subject<Cliente[]>;
  public clientes$: Observable<Cliente[]>;

  private _loadingSource: Subject<boolean>;
  public loading$: Observable<boolean>;

  @ViewChild("listado") public listado: ClientesListadoComponent;

  constructor(
    private httpSvc: ClientesHttpService
  ) { 
    this._clientes = [];
    this._clientesSource = new Subject<Cliente[]>();
    this.clientes$ = this._clientesSource.asObservable();

    this._loadingSource = new Subject<boolean>();
    this.loading$ = this._loadingSource.asObservable();
  }

  ngOnInit() {
    this.cargarClientes();
  }

  private cargarClientes(): Observable<Cliente[]> {
    this._loadingSource.next(true);
    const clientes: Observable<Cliente[]> = this.httpSvc.listarClientes();
    clientes.subscribe((payload: Cliente[]) => {
      this._clientes = payload;
      this._clientesSource.next(payload);
    }, err => {
      console.log(err);
      this._clientes = [];
      this._clientesSource.next([]);
    }, () => {
      this._loadingSource.next(false);
    });
    return from(clientes);
  }

  
}
