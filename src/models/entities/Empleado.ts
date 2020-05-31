import { AbstractEntity } from '../AbstractEntity';
import { Persona } from '../Persona';

export class Empleado
  extends AbstractEntity
  implements Persona {

  public id: number;
  public nombre: string;

  public idCargo?: number;

  public idPersona: number;
  public nombrePersona?: string;
  public rutPersona?: string;
  public direccionPersona?: string;
  public emailPersona?: string;
  public fonoPersona1?: number;
  public fonoPersona2?: number;
  public fonoPersona3?: number;
}
