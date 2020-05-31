import { Image } from './Image';
import { AbstractEntity } from './AbstractEntity';

/**
 * An element that can be documented and be found info about on the internet.
 */
export abstract class DocumentableEntity
  extends AbstractEntity {

  public abstract images: Image[];
  public abstract urls: string[];
}
