import { Observable } from 'rxjs';
import { Persona } from 'src/models/entities/Persona';
import { Sesion } from 'src/models/entities/Sesion';

export interface AuthDataService {

  abrirSesion(details: any): Observable<Partial<Sesion>>;
  validarSesion(ssn: Partial<Sesion>): Observable<boolean>;
  obtenerDatosPersonaSesion(ssn: Sesion): Observable<Partial<Persona>>;
  actualizarPerfil(usr: Persona): Observable<number>;
  cerrarSesion(ssn: Partial<Sesion>): Observable<boolean>;
}
