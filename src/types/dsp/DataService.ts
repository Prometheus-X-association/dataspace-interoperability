import { IDataset } from './Dataset';
import { IResource, Resource } from './Resource';
import {IEdcDataService} from "../edc/EdcDataService";

export interface IDataService extends IResource {
    'dcat:endpointURL'?: string | string[];
    'dcat:endpointDescription'?: string;
    'dcat:servesDataset'?: IDataset[];
}

export class DataService extends Resource implements IDataService {
  public 'dcat:endpointURL'?: string | string[];
  public 'dcat:endpointDescription'?: string;
  public 'dcat:servesDataset'?: IDataset[];


  /**
   * Converts the instance to a JSON object.
   * @returns {IEdcCatalog} The JSON representation of the instance.
   */
  public toJSON(): IEdcDataService {
      return {
          ...super.toJSON(),
          'dcat:endpointURL': this['dcat:endpointURL'],
          'dcat:endpointDescription': this['dcat:endpointDescription'],
          'dcat:servesDataset': this['dcat:servesDataset'],
      };
  }
}
