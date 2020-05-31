/**
 * An identifiable element.
 */
export abstract class AbstractEntity {

  public abstract id: number | string;
  public nombre?: string;
  public descripcion?: string;
}
