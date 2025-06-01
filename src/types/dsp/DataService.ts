import { IDataset } from './Dataset';
import { IResource, Resource } from './Resource';

export interface IDataService extends IResource {
    'dcat:endpointURL'?: string | string[];
    'dcat:endpointDescription'?: string;
    'dcat:servesDataset'?: IDataset[];
}

export class DataService extends Resource implements IDataService {
  public 'dcat:endpointURL'?: string | string[];
  public 'dcat:endpointDescription'?: string;
  public 'dcat:servesDataset'?: IDataset[];
}
