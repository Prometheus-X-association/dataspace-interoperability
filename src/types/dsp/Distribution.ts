import { IDataService } from './DataService';

export interface IDistribution {
  '@id'?: string;
  '@type'?: string;
  'dcterms:title'?: string;
  'dcterms:description'?: string;
  'dcterms:issued'?: string | Date;
  'dcterms:modified'?: string | Date;
  'dcterms:license'?: string;
  'dcterms:accessRights'?: string;
  'dcterms:rights'?: string;
  'odrl:hasPolicy'?: boolean;
  'dcat:accessURL'?: string | string[];
  'dcat:downloadURL'?: string | string[];
  'dcat:accessService'?: IDataService;
  'dcat:byteSize'?: number;
  'dcat:spatialResolutionInMeters'?: string;
  'dcat:temporalResolution'?: string;
  'dcterms:conformsTo'?: string;
  'dcat:mediaType'?: string;
  'dcterms:format'?: string;
  'dcat:compressFormat'?: string;
  'dcat:packageFormat'?: string;
}

export class Distribution implements IDistribution {
  public '@id'?: string;
  public '@type'?: string;
  public 'dcterms:title'?: string;
  public 'dcterms:description'?: string;
  public 'dcterms:issued'?: string | Date;
  public 'dcterms:modified'?: string | Date;
  public 'dcterms:license'?: string;
  public 'dcterms:accessRights'?: string;
  public 'dcterms:rights'?: string;
  public 'odrl:hasPolicy'?: boolean;
  public 'dcat:accessURL'?: string | string[];
  public 'dcat:downloadURL'?: string | string[];
  public 'dcat:accessService'?: IDataService;
  public 'dcat:byteSize'?: number;
  public 'dcat:spatialResolutionInMeters'?: string;
  public 'dcat:temporalResolution'?: string;
  public 'dcterms:conformsTo'?: string;
  public 'dcat:mediaType'?: string;
  public 'dcterms:format'?: string;
  public 'dcat:compressFormat'?: string;
  public 'dcat:packageFormat'?: string;

  /**
   * Converts the instance to a JSON object.
   * @returns {IDistribution} The JSON representation of the instance.
   */
  public toJSON(): IDistribution {
    return {
      '@id': this['@id'],
      '@type': this['@type'],
      'dcterms:title': this['dcterms:title'],
      'dcterms:description': this['dcterms:description'],
      'dcterms:issued': this['dcterms:issued'],
      'dcterms:modified': this['dcterms:modified'],
      'dcterms:license': this['dcterms:license'],
      'dcterms:accessRights': this['dcterms:accessRights'],
      'dcterms:rights': this['dcterms:rights'],
      'odrl:hasPolicy': this['odrl:hasPolicy'],
      'dcat:accessURL': this['dcat:accessURL'],
      'dcat:downloadURL': this['dcat:downloadURL'],
      'dcat:accessService': this['dcat:accessService'],
      'dcat:byteSize': this['dcat:byteSize'],
      'dcat:spatialResolutionInMeters': this['dcat:spatialResolutionInMeters'],
      'dcat:temporalResolution': this['dcat:temporalResolution'],
      'dcterms:conformsTo': this['dcterms:conformsTo'],
      'dcat:mediaType': this['dcat:mediaType'],
      'dcterms:format': this['dcterms:format'],
      'dcat:compressFormat': this['dcat:compressFormat'],
      'dcat:packageFormat': this['dcat:packageFormat']
    };
  }
}
