import { Injectable } from '@angular/core';
import { RootHttpService } from 'src/http-services/root.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from 'src/models/Empleado';

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

  public guardarEmpleado(emp: Empleado): Observable<number> {
    return this.http.post<number>(this.baseURI + "/guardar", emp);
  }

  public borrarEmpleado(idEmpleado: number): Observable<boolean> {
    return this.http.post<boolean>(this.baseURI + "/borrar", idEmpleado);
  }
}
