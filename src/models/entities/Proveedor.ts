import { Persona } from '../Persona';
import { AbstractEntity } from '../AbstractEntity';

export class Proveedor
  extends AbstractEntity
  implements Persona {

  public id: number;
  public nombre?: string;

  public razonSocial: string;
  public idPersona: number;
  public rutPersona?: string;
  public direccionPersona?: string;
  public emailPersona?: string;
  public fonoPersona1?: number;
  public fonoPersona2?: number;
  public fonoPersona3?: number;
}
