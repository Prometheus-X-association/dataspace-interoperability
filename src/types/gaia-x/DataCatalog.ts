import { ICatalog } from '../dsp/Catalog';
import { Catalog } from '../dsp/Catalog';
/**
 * Represents a Gaia-X Data Catalog.
 * @interface IDataCatalog
 * @property {'gx-trust-framework:getVerifiableCredentialsIDs'} gx-trust-framework:getVerifiableCredentialsIDs - 
 * A route used to synchronize catalogues and retrieve the list of Verifiable Credentials (issuer, id).
 */
export interface IDataCatalog extends ICatalog {
    'gx-trust-framework:getVerifiableCredentialsIDs': string;
}

/**
 * Implementation of IDataCatalog.
 * @class DataCatalog
 * @implements {IDataCatalog}
 */
export class DataCatalog extends Catalog implements IDataCatalog {
  /**
   * The route used to synchronize catalogues and retrieve the list of Verifiable Credentials (issuer, id).
   */
  public 'gx-trust-framework:getVerifiableCredentialsIDs': string;

  /**
   * Constructs a new DataCatalog instance.
   * @param init - The initialization object.
   */
  constructor(init: IDataCatalog) {
    super();
    this['gx-trust-framework:getVerifiableCredentialsIDs'] = init['gx-trust-framework:getVerifiableCredentialsIDs'];
  }

  /**
   * Converts the instance to a JSON object.
   * @returns {IDataCatalog} The JSON representation of the instance.
   */
  public toJSON(): IDataCatalog {
    return {
      ...super.toJSON(),
      'gx-trust-framework:getVerifiableCredentialsIDs': this['gx-trust-framework:getVerifiableCredentialsIDs']
    };
  }
}
