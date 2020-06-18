import { AbstractEntity } from '../AbstractEntity';

export class TipoProducto
  extends AbstractEntity {

  public id: number;
  public descripcion: string;
  public idFamiliaProducto: number;
  public descripcionFamiliaProducto?: string;
}
