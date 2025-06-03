import { dcterms } from './dcterms';

export interface ICatalogRecord {
    'dcterms:title': string;
    'dcterms:description': string;
    'dcterms:issued': string;
    'dcterms:modified': string; // modificationDate;
    'foaf:primaryTopic': unknown;
    'dcterms:conformsTo': dcterms.Standard;
}

export class CatalogRecord implements ICatalogRecord {
  public 'dcterms:title': string;
  public 'dcterms:description': string;
  public 'dcterms:issued': string;
  public 'dcterms:modified': string; // modificationDate;
  public 'foaf:primaryTopic': unknown;
  public 'dcterms:conformsTo': dcterms.Standard;
}
