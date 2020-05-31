import { Persona } from '../Persona';
import { AbstractEntity } from '../AbstractEntity';

export class Usuario
  extends AbstractEntity
  implements Persona {

  public id: number;
  public nombre: string;
  public fechaCreacionUsuario?: string;
  public claveUsuario?: string;
  public sesion?: string;

  public idPersona: number;
  public nombrePersona?: string;
  public rutPersona?: string;
  public direccionPersona?: string;
  public emailPersona?: string;
  public fonoPersona1?: number;
  public fonoPersona2?: number;
  public fonoPersona3?: number;
}
