import { Injectable } from '@angular/core';
import { RootHttpService } from 'src/http-services/root.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from 'src/modelo/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesHttpService extends RootHttpService {

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

  public borrarCliente(idCliente: number): Observable<boolean> {
    return this.http.post<boolean>(this.baseURI + "/borrar", idCliente);
  }
}
