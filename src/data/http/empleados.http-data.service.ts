import { Injectable } from '@angular/core';
import { HttpService } from 'src/data/http/http.abstract-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from 'src/models/Empleado';
import { retry, map } from 'rxjs/operators';
import { EntityDataService } from '../entity.data.iservice';

@Injectable()
export class EmpleadosHttpDataService
  extends HttpService
  implements EntityDataService<Empleado> {

  protected baseURI = this.baseURI + '/gestion/empleados';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }
  readById(id: string | number): Observable<Empleado> {
    throw new Error('Method not implemented.');
  }
  readFiltered(f: any): Observable<Empleado[]> {
    throw new Error('Method not implemented.');
  }
  update(emp: Empleado, id: string | number): Observable<Empleado> {
    throw new Error('Method not implemented.');
  }

  public readAll(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(
      this.baseURI
    ).pipe(
      retry(2)
    );
  }

  public create(emp: Empleado): Observable<Empleado> {
    return this.http.post<number>(
      this.baseURI + '/guardar',
      emp
    ).pipe(
      map(id => {
        emp.idEmpleado = id;
        return emp;
      })
    );
  }

  public deleteById(idEmpleado: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseURI + '/borrar',
      idEmpleado
    );
  }
}
