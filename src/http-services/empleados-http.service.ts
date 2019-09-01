import { Injectable } from '@angular/core';
import { RootHttpService } from 'src/http-services/root-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from 'src/modelo/Empleado';
import { retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EmpleadosHttpService extends RootHttpService {

  protected baseURI = this.baseURI + '/gestion/empleados';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public listarEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(
      this.baseURI
    ).pipe(
      retry(2)
    );
  }

  public guardarEmpleado(emp: Empleado): Observable<number> {
    return this.http.post<number>(
      this.baseURI + '/guardar',
      emp
    );
  }

  public borrarEmpleado(idEmpleado: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseURI + '/borrar',
      idEmpleado
    );
  }
}
