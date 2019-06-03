import { Injectable } from '@angular/core';
import { RootService } from 'src/app/root.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from 'src/models/Empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService extends RootService {

  protected baseURI = this.baseURI + "/gestion/empleados";

  constructor(
    private http: HttpClient
  ) { 
    super();
  }

  public listarEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.baseURI);
  }

  public guardarEmpleado(emp: Empleado): Observable<number> {
    return this.http.post<number>(this.baseURI + "/guardar", emp, {
      headers: new HttpHeaders({"Allow": "POST"})
    });
  }

  public borrarEmpleado(idEmpleado: number): Observable<void> {
    return this.http.post<void>(this.baseURI + "/borrar", idEmpleado);
  }
}
