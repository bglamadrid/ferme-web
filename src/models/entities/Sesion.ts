import { AbstractEntity } from '../AbstractEntity';

export class Sesion
  extends AbstractEntity {

  public id: number;

  public fechaAbiertaSesion: string;
  public hashSesion: string;
  public idUsuario: number;
  public nombreUsuario: string;

  public idPersona?: number;
  public idEmpleado?: number;
  public idCargo?: number;
  public idCliente?: number;
}
