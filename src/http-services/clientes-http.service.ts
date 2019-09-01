import { Injectable } from '@angular/core';
import { RootHttpService } from 'src/http-services/root-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from 'src/modelo/Cliente';
import { retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ClientesHttpService extends RootHttpService {

  protected baseURI = this.baseURI + '/gestion/clientes';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(
      this.baseURI
    ).pipe(
      retry(2)
    );
  }

  public guardarCliente(cli: Cliente): Observable<number> {
    return this.http.post<number>(
      this.baseURI + '/guardar',
      cli
    );
  }

  public borrarCliente(idCliente: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseURI + '/borrar',
      idCliente
    );
  }
}
