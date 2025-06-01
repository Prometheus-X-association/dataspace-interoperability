import { DataUsageAgreement, IDataUsageAgreement } from './DataUsageAgreement';
import { IDistribution, Distribution } from './Distribution';
import { Dataset as DSPDataSet } from '../dsp/Dataset';
import { IDataset as IDSPDataSet } from '../dsp/Dataset';

/**
 * Represents a Data Set.
 * @interface IDataSet
 * @property {'dct:title'} dct:title - Title of the Data Product.
 * @property {'dct:description'} dct:description - Description of the Data Product.
 * @property {'dct:distributions'} dct:distributions - List of distributions format of the dataset.
 * @property {'dct:identifier'} dct:identifier - Unique uuid4.
 * @property {'dct:issued'} dct:issued - Publication date in ISO 8601 format.
 * @property {'gx:expirationDateTime'} gx:expirationDateTime - Date time in ISO 8601 format after which data is expired and shall be deleted.
 * @property {'dct:license'} dct:license - A list of URIs to license document.
 * @property {'gx:dataLicensors'} gx:dataLicensors - A list of Data Licensors either as a free form string or participant Description.
 * @property {'gx:dataUsageAgreement'} gx:dataUsageAgreement - List of authorizations from the data subjects as Natural Person when the dataset contains PII, as defined by the Trust Framework.
 * @property {'gx:exposedThrough'} gx:exposedThrough - A resolvable link to the data exchange component that exposes the Data Product.
 */
export interface IDataSet extends IDSPDataSet {
    'dct:title'?: string;
    'dct:description'?: string;
    'dct:distributions'?: IDistribution[];
    'dct:identifier'?: string;
    'dct:issued'?: Date | string;
    'gx:expirationDateTime'?: Date;
    'dct:license'?: string[];
    'gx:dataLicensors'?: string[];
    'gx:dataUsageAgreement'?: IDataUsageAgreement[];
    'gx:exposedThrough'?: string[];
}

/**
 * Implementation of IDataSet.
 * @class DataSet
 * @implements {IDataSet}
 */
export class DataSet extends DSPDataSet implements IDataSet {
  public 'dct:title': string;
  public 'dct:description': string;
  public 'dct:distributions': Distribution[];
  public 'dct:identifier': string;
  public 'dct:issued'?: Date | string;
  public 'gx:expirationDateTime'?: Date;
  public 'dct:license'?: string[];
  public 'gx:dataLicensors'?: string[];
  public 'gx:dataUsageAgreement'?: DataUsageAgreement[];
  public 'gx:exposedThrough': string[];

  /**
   * Constructs a new DataSet instance.
   * @param init - The initialization object.
   */
  constructor(init: IDataSet) {
    super();
    Object.assign(this, init);
  }

  /**
   * Converts the instance to a JSON object.
   * @returns {IDataSet} The JSON representation of the instance.
   */
  public toJSON(): IDataSet {
    return {
      ...super.toJSON(),
      '@type': this['@type'],
      'dcterms:title': this['dct:title'],
      'dcterms:description': this['dct:description'],
      'dct:title': this['dct:title'],
      'dct:description': this['dct:description'],
      'dct:distributions': this['dct:distributions'],
      'dct:identifier': this['dct:identifier'],
      'dct:issued': this['dct:issued'],
      'gx:expirationDateTime': this['gx:expirationDateTime'],
      'dct:license': this['dct:license'],
      'gx:dataLicensors': this['gx:dataLicensors'],
      'gx:dataUsageAgreement': this['gx:dataUsageAgreement']?.map((agreement) => agreement.toJSON()),
      'gx:exposedThrough': this['gx:exposedThrough']
    };
  }
}
