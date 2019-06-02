import { Injectable } from '@angular/core';
import { RootService } from 'src/app/root.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from 'src/models/Empleado';

const URLS = {
  listar: ""
}

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService extends RootService {

  protected baseURI = this.baseURI + "gestion/empleados";

  constructor(
    private http: HttpClient
  ) { 
    super();
  }

  public listarEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.baseURI + URLS.listar);
  }
}
