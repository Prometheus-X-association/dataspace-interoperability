import { ISignatureCheckType, SignatureCheckType } from './SignatureCheckType';

/**
 * Represents a Data Usage Agreement.
 * @interface IDataUsageAgreement
 * @property {'gx:producedBy'} gx:producedBy - A resolvable link to the Data Producer.
 * @property {'gx:providedBy'} gx:providedBy - A resolvable link to the Data Product Provider.
 * @property {'gx:licensedBy'} gx:licensedBy - A list of resolvable links to Data Licensors.
 * @property {'gx:dataUsageAgreementTrustAnchor'} gx:dataUsageAgreementTrustAnchor - A resolvable link to the Data Usage Agreement Trust Anchor.
 * @property {'gx:dataProduct'} gx:dataProduct - A resolvable link to the Data Product Description.
 * @property {'gx:signers'} gx:signers - The array identifying all required Participant signatures.
 */
export interface IDataUsageAgreement {
    'gx:producedBy': string;
    'gx:providedBy': string;
    'gx:licensedBy'?: string[];
    'gx:dataUsageAgreementTrustAnchor': string;
    'gx:dataProduct': string;
    'gx:signers': ISignatureCheckType[];
}

/**
 * Implementation of IDataUsageAgreement.
 * @class DataUsageAgreement
 * @implements {IDataUsageAgreement}
 */
export class DataUsageAgreement implements IDataUsageAgreement{
  public 'gx:producedBy': string;
  public 'gx:providedBy': string;
  public 'gx:licensedBy'?: string[];
  public 'gx:dataUsageAgreementTrustAnchor': string;
  public 'gx:dataProduct': string;
  public 'gx:signers': SignatureCheckType[];

  /**
   * Constructs a new DataUsageAgreement instance.
   * @param init - The initialization object.
   */
  constructor(init: IDataUsageAgreement) {
    Object.assign(this, init);
  }

  /**
   * Converts the instance to a JSON object.
   * @returns {IDataUsageAgreement} The JSON representation of the instance.
   */
  public toJSON(): IDataUsageAgreement {
    return {
      'gx:producedBy': this['gx:producedBy'],
      'gx:providedBy': this['gx:providedBy'],
      'gx:licensedBy': this['gx:licensedBy'],
      'gx:dataUsageAgreementTrustAnchor': this['gx:dataUsageAgreementTrustAnchor'],
      'gx:dataProduct': this['gx:dataProduct'],
      'gx:signers': this['gx:signers'].map((signer) => signer.toJSON())
    };
  }
}
