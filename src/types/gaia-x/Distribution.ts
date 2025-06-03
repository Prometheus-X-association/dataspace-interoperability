import { DataUsageAgreement, IDataUsageAgreement } from './DataUsageAgreement';
import { Distribution as DSPDistribution } from '../dsp/Distribution';
import { IDistribution as IDSPDistribution } from '../dsp/Distribution';

/**
 * Represents a dataset distribution.
 * @interface IDistribution
 * @property {'dct:title'} dct:title - Title of the Data Product.
 * @property {'dct:format'} dct:format - Format of the dataset distribution (e.g., 'application/pdf', 'text/csv').
 * @property {'dcat:compressFormat'} dcat:compressFormat - The compression format of the distribution in which the data is contained in a compressed form.
 * @property {'dcat:packageFormat'} dcat:packageFormat - The package format of the distribution in which one or more data files are grouped together.
 * @property {'dcat:byteSize'} dcat:byteSize - Size of the dataset distribution.
 * @property {'gx:location'} gx:location - List of dataset storage location.
 * @property {'gx:hash'} gx:hash - To uniquely identify the data contained in the dataset distribution.
 * @property {'gx:hashAlgorithm'} gx:hashAlgorithm - Hash Algorithm.
 * @property {'dct:issued'} dct:issued - Publication date in ISO 8601 format.
 * @property {'gx:expirationDateTime'} gx:expirationDateTime - Date time in ISO 8601 format after which data is expired and shall be deleted.
 * @property {'dcat:language'} dcat:language - Language.
 * @property {'dct:license'} dct:license - A list of URIs to license document.
 * @property {'gx:dataLicensors'} gx:dataLicensors - A list of Licensors either as a free form string or participant Description.
 * @property {'gx:dataUsageAgreement'} gx:dataUsageAgreement - List of authorizations from the data subjects as Natural Person when the dataset contains PII, as defined by the Trust Framework.
 */
export interface IDistribution extends Omit<IDSPDistribution, 'dcat:compressFormat' | 'dcat:packageFormat'> {
    'dct:title': string;
    'dct:format': string;
    'gx:location'?: string[];
    'gx:hash'?: string;
    'gx:hashAlgorithm'?: string;
    'dct:issued'?: Date | string;
    'gx:expirationDateTime'?: string;
    'dcat:language'?: string;
    'dct:license'?: string[];
    'gx:dataLicensors'?: string[];
    'gx:dataUsageAgreement'?: IDataUsageAgreement[];
}

/**
 * Implementation of IDistribution.
 * @class Distribution
 * @implements {IDistribution}
 */
export class Distribution extends DSPDistribution implements IDistribution {
  public 'dct:title': string;
  public 'dct:format': string;
  public 'gx:location'?: string[];
  public 'gx:hash'?: string;
  public 'gx:hashAlgorithm'?: string;
  public 'dct:issued'?: string;
  public 'gx:expirationDateTime'?: string;
  public 'dcat:language'?: string;
  public 'dct:license'?: string[];
  public 'gx:dataLicensors'?: string[];
  public 'gx:dataUsageAgreement'?: DataUsageAgreement[];

  /**
   * Constructs a new Distribution instance.
   * @param init - The initialization object.
   */
  constructor(init: IDistribution) {
    super();
    Object.assign(this, init);
  }

  /**
   * Converts the instance to a JSON object.
   * @returns {IDistribution} The JSON representation of the instance.
   */
  public toJSON(): IDistribution {
    return {
      ...super.toJSON(),
      'dct:title': this['dct:title'],
      'dct:format': this['dct:format'],
      'gx:location': this['gx:location'],
      'gx:hash': this['gx:hash'],
      'gx:hashAlgorithm': this['gx:hashAlgorithm'],
      'dct:issued': this['dct:issued'],
      'gx:expirationDateTime': this['gx:expirationDateTime'],
      'dcat:language': this['dcat:language'],
      'dct:license': this['dct:license'],
      'gx:dataLicensors': this['gx:dataLicensors'],
      'gx:dataUsageAgreement': this['gx:dataUsageAgreement']?.map((agreement) => agreement.toJSON())
    };
  }
}
