import { Persona } from './Persona';
import { AbstractEntity } from '../AbstractEntity';

export class Usuario extends AbstractEntity implements Persona {
  public id: number;
  public nombreUsuario: string;
  public fechaCreacionUsuario: string;
  public claveUsuario?: string;
  public sesion?: string;
  idPersona: number;
  nombreCompletoPersona?: string;
  rutPersona?: string;
  direccionPersona?: string;
  emailPersona?: string;
  fonoPersona1?: number;
  fonoPersona2?: number;
  fonoPersona3?: number;
}
