import { Persona } from './Persona';

export class Usuario extends Persona {
  public idUsuario: number;
  public nombreUsuario: string;
  public fechaCreacionUsuario: string;
  public claveUsuario?: string;
  public sesion?: string;
}
