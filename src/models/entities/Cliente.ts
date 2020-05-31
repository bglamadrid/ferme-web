import { AbstractEntity } from '../AbstractEntity';
import { Persona } from '../Persona';

export class Cliente
  extends AbstractEntity
  implements Persona {

  public id: number;
  public nombre: string;

  public idPersona: number;
  public rutPersona?: string;
  public direccionPersona?: string;
  public emailPersona?: string;
  public fonoPersona1?: number;
  public fonoPersona2?: number;
  public fonoPersona3?: number;
}
