import { AbstractEntity } from '../AbstractEntity';

export class FamiliaProducto
  extends AbstractEntity {

  public id: number;
  public descripcion: string;

  public idRubro?: number;
  public descripcionRubro?: string;
  public idProveedor?: number;
}
