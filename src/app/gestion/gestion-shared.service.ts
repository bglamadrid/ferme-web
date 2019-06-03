import { Injectable } from '@angular/core';
import { RootService } from '../root.service';
import { Observable } from 'rxjs';
import { Cargo } from 'src/models/Cargo';
import { HttpClient } from '@angular/common/http';
import { Rubro } from 'src/models/Rubro';

@Injectable({
  providedIn: 'root'
})
export class GestionSharedService extends RootService {


  protected baseURI: string = this.baseURI + "/gestion";

  constructor(
    private http: HttpClient
  ) { 
    super();
  }

  public cargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.baseURI+"/cargos");
  }

  public rubros(): Observable<Rubro[]> {
    return this.http.get<Rubro[]>(this.baseURI+"/rubros");
  }
}
