import { CatalogEnum } from './CatalogEnum';

/**
 * Represents a Catalog.
 * @interface ICatalog
 * @property {string} endpoint - The endpoint URL.
 * @property {string} resourceId - The resource identifier.
 * @property {CatalogEnum} type - The type of catalog.
 * @property {boolean} enabled - Whether the catalog is enabled.
 */
export interface ICatalog {
    endpoint: string;
    resourceId: string;
    type: CatalogEnum;
    enabled: boolean;
}

/**
 * Implementation of ICatalog.
 * @class Catalog
 * @implements {ICatalog}
 */
export class Catalog implements ICatalog {
  public endpoint!: string;
  public resourceId!: string;
  public type!: CatalogEnum;
  public enabled!: boolean;

  /**
   * Constructs a new Catalog instance.
   * @param init - The initialization object.
   */
  constructor(init: ICatalog) {
    Object.assign(this, init);
  }

  /**
   * Converts the instance to a JSON object.
   * @returns {ICatalog} The JSON representation of the instance.
   */
  public toJSON(): ICatalog {
    return {
      endpoint: this.endpoint,
      resourceId: this.resourceId,
      type: this.type,
      enabled: this.enabled
    };
  }
}

