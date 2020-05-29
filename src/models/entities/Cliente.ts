import { Persona } from './Persona';
import { AbstractEntity } from '../AbstractEntity';

export class Cliente extends AbstractEntity implements Persona {
  public id: number;
  idPersona: number;
  nombreCompletoPersona?: string;
  rutPersona?: string;
  direccionPersona?: string;
  emailPersona?: string;
  fonoPersona1?: number;
  fonoPersona2?: number;
  fonoPersona3?: number;
}
