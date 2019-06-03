import { Injectable } from '@angular/core';
import { RootService } from 'src/app/root.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from 'src/models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService extends RootService {

  protected baseURI = this.baseURI + "/gestion/clientes";

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseURI);
  }

  public guardarCliente(cli: Cliente): Observable<number> {
    return this.http.post<number>(this.baseURI + "/guardar", cli);
  }

  public borrarCliente(idCliente: number): Observable<void> {
    return this.http.post<void>(this.baseURI + "/borrar", idCliente);
  }
}
