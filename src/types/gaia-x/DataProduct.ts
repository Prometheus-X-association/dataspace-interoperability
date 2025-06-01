import { DataSet, IDataSet } from './DataSet';
import { DataUsage, IDataUsage } from './DataUsage';
import { IPolicy, Policy } from './Policy';
import { vcard } from './vcard';
import { IResource, Resource } from '../dsp/Resource';

/**
 * Interface representing a Gaia-X Data Product
 * @interface IDataProduct
 * @property {'gx:providedBy'} gx:providedBy - A resolvable link to the participant providing the service
 * @property {'gx:termsAndConditions'} gx:termsAndConditions - A resolvable link to the Terms and Conditions applying to that service
 * @property {'dct:license'} dct:license - A list of URIs to license documents
 * @property {'gx:title'} gx:title - Title of the Data Product
 * @property {'gx:description'} gx:description - Optional description of the Data Product
 * @property {'dct:issued'} dct:issued - Optional publication date in ISO 8601 format
 * @property {'gx:obsoleteDateTime'} gx:obsoleteDateTime - Optional date time in ISO 8601 format after which the Data Product is obsolete
 * @property {'odrl:hasPolicy'} odrl:hasPolicy - Optional policy expressed using ODRL
 * @property {'gx:dataLicensors'} gx:dataLicensors - Optional list of Licensors either as a free form string or participant Description
 * @property {'gx:dataUsageAgreement'} gx:dataUsageAgreement - Optional list of authorizations from the data subjects as Natural Person when the dataset contains PII
 * @property {'gx:aggregationOf'} gx:aggregationOf - Array of datasets that this data product aggregates
 * @property {'dct:identifier'} dct:identifier - Unique uuid4 for the data product
 * @property {'dcat:contactPoint'} dcat:contactPoint - Optional contacts to get more information in vCard format
 * @property {'dcterms:conformsTo'} dcterms:conformsTo - Optional list of established standards to which the described resource conforms
 */
export interface IDataProduct extends IResource{
    'gx:providedBy': string;
    'gx:termsAndConditions': string;
    'dct:license': string[];
    'gx:title': string;
    'gx:description'?: string;
    'dct:issued'?: Date | string;
    'gx:obsoleteDateTime'?: Date;
    'gx:dataLicensors'?: string[];
    'gx:dataUsageAgreement'?: IDataUsage[];
    'gx:aggregationOf': IDataSet[];
    'dct:identifier': string;
}

/**
 * Class representing a Gaia-X Data Product
 * @class DataProduct
 * @implements {IDataProduct}
 */
export class DataProduct extends Resource implements IDataProduct {
  public 'gx:providedBy': string;
  public 'gx:termsAndConditions': string;
  public 'dct:license': string[];
  public 'gx:title': string;
  public 'gx:description'?: string;
  public 'dct:issued'?: Date;
  public 'gx:obsoleteDateTime'?: Date;
  public 'gx:dataLicensors'?: string[];
  public 'gx:dataUsageAgreement'?: DataUsage[];
  public 'gx:aggregationOf': DataSet[];
  public 'dct:identifier': string;

  /**
     * Creates an instance of DataProduct
     * @param {Partial<IDataProduct>} init - Partial data to initialize the DataProduct
     */
  constructor(init: IDataProduct) {
    super();
    Object.assign(this, init);
  }

  /**
     * Converts the DataProduct to a plain object
     * @returns {IDataProduct} The plain object representation
     */
  public toJSON(): IDataProduct {
    return {
      ...super.toJSON(),
      'gx:providedBy': this['gx:providedBy'],
      'gx:termsAndConditions': this['gx:termsAndConditions'],
      'dct:license': this['dct:license'],
      'gx:title': this['gx:title'],
      'gx:description': this['gx:description'],
      'dct:issued': this['dct:issued'],
      'gx:obsoleteDateTime': this['gx:obsoleteDateTime'],
      'gx:dataLicensors': this['gx:dataLicensors'],
      'gx:dataUsageAgreement': this['gx:dataUsageAgreement'],
      'gx:aggregationOf': this['gx:aggregationOf'],
      'dct:identifier': this['dct:identifier'],
    };
  }
}
