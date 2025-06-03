import { ISignatureCheckType, SignatureCheckType } from './SignatureCheckType';

/**
 * Represents a Data Product Usage Contract.
 * @interface IDataProductUsageContract
 * @property {'gx:providedBy'} gx:providedBy - A resolvable link to the Data Product Provider.
 * @property {'gx:consumedBy'} gx:consumedBy - A resolvable link to the Data Consumer.
 * @property {'gx:dataProduct'} gx:dataProduct - A resolvable link to the Data Product Description (after negotiation).
 * @property {'gx:signers'} gx:signers - The array identifying all required Participant signatures.
 * @property {'gx:termOfUsage'} gx:termOfUsage - A resolvable link to the Term of Usage.
 * @property {'gx:notarizedIn'} gx:notarizedIn - A resolvable link to the Notarization service.
 * @property {'gx:dataUsage'} gx:dataUsage - A resolvable link to Data Usage.
 */
export interface IDataProductUsageContract {
    'gx:providedBy': string;
    'gx:consumedBy': string;
    'gx:dataProduct': string;
    'gx:signers': ISignatureCheckType[];
    'gx:termOfUsage': string;
    'gx:notarizedIn'?: string;
    'gx:dataUsage': string;
}

/**
 * Implementation of IDataProductUsageContract.
 * @class DataProductUsageContract
 * @implements {IDataProductUsageContract}
 */
export class DataProductUsageContract implements IDataProductUsageContract {
  public 'gx:providedBy': string;
  public 'gx:consumedBy': string;
  public 'gx:dataProduct': string;
  public 'gx:signers': SignatureCheckType[];
  public 'gx:termOfUsage': string;
  public 'gx:notarizedIn'?: string;
  public 'gx:dataUsage': string;

  /**
   * Constructs a new DataProductUsageContract instance.
   * @param init - The initialization object.
   */
  constructor(init: IDataProductUsageContract) {
    Object.assign(this, init);
  }

  /**
   * Converts the instance to a JSON object.
   * @returns {IDataProductUsageContract} The JSON representation of the instance.
   */
  public toJSON(): IDataProductUsageContract {
    return {
      'gx:providedBy': this['gx:providedBy'],
      'gx:consumedBy': this['gx:consumedBy'],
      'gx:dataProduct': this['gx:dataProduct'],
      'gx:signers': this['gx:signers'].map((signer) => signer.toJSON()),
      'gx:termOfUsage': this['gx:termOfUsage'],
      'gx:notarizedIn': this['gx:notarizedIn'],
      'gx:dataUsage': this['gx:dataUsage']
    };
  }
}
