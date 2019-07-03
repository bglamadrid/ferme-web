import { Injectable } from '@angular/core';
import { RootHttpService } from 'src/http-services/root.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from 'src/modelo/Empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosHttpService extends RootHttpService {

  protected baseURI = this.baseURI + "/gestion/empleados";

  constructor(
    private http: HttpClient
  ) { 
    super();
  }

  public listarEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.baseURI);
  }

  public obtenerEmpleadoIdDesdePersonaId(idPersona: number): Observable<Empleado[]> {
    const queryParams: HttpParams = new HttpParams().append("personaId", idPersona.toString());
    return this.http.get<Empleado[]>(this.baseURI, { params: queryParams });
  }

  public guardarEmpleado(emp: Empleado): Observable<number> {
    return this.http.post<number>(this.baseURI + "/guardar", emp);
  }

  public borrarEmpleado(idEmpleado: number): Observable<boolean> {
    return this.http.post<boolean>(this.baseURI + "/borrar", idEmpleado);
  }
}
