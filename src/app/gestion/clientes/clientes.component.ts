import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from 'src/models/Cliente';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public clientes$: Observable<Cliente[]>;
  public displayedColumns: string[] = [ "nombre", "rut" ];

  public loading$: Observable<boolean> = of(true);

  constructor(
    private localSvc: ClientesService
  ) { }

  ngOnInit() {
    this.localSvc.listarClientes().subscribe(
      (clientes: Cliente[]) => {
        this.clientes$ = of(clientes);
        this.loading$ = of(false);
      }
    );
  }

}
