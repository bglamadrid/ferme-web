import { Injectable } from '@angular/core';
import { RootService } from 'src/app/root.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from 'src/models/Cliente';

const URLS = {
  listar: ""
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService extends RootService {

  protected baseURI = this.baseURI + "gestion/clientes";

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseURI + URLS.listar);
  }
}
