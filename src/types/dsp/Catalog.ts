import { IDataService } from './DataService';
import { Dataset, IDataset } from './Dataset';
import { IResource } from './Resource';

export interface ICatalog extends IDataset {
  'foaf:homepage'?: string;
  'dcat:themeTaxonomy'?: string[];
  'dcat:resource'?: IResource | IResource[];
  'dcat:dataset'?: IDataset | IDataset[];
  'dcat:service'?: IDataService | IDataService[];
  'dcat:catalog'?: ICatalog | ICatalog[];
}

export class Catalog extends Dataset implements ICatalog {
  public 'foaf:homepage'?: string;
  public 'dcat:themeTaxonomy'?: string[];
  public 'dcat:resource'?: IResource | IResource[];
  public 'dcat:dataset'?: IDataset | IDataset[];
  public 'dcat:service'?: IDataService | IDataService[];
  public 'dcat:catalog'?: ICatalog | ICatalog[];

  /**
   * Converts the instance to a JSON object.
   * @returns {ICatalog} The JSON representation of the instance.
   */
  public toJSON(): ICatalog {
    return {
      ...super.toJSON(),
      'foaf:homepage': this['foaf:homepage'],
      'dcat:themeTaxonomy': this['dcat:themeTaxonomy'],
      'dcat:resource': this['dcat:resource'],
      'dcat:dataset': this['dcat:dataset'],
      'dcat:service': this['dcat:service'],
      'dcat:catalog': this['dcat:catalog']
    };
  }
}
