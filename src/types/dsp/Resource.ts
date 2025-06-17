import { odrl } from './odrl';
import { skos } from './skos';
import { dcterms } from './dcterms';
import { foaf } from './foaf';
import { vcard } from './vcard';
import { prov } from './prov';
import { IRelationship } from './Relationship';

export interface IResource {
    '@id'?: string;
    '@context'?: string | Object;
    '@type'?: string;
    'dcterms:title'?: string;
    'dcterms:description'?: string;
    'dcterms:accessRights'?: dcterms.RightsStatement;
    'dcterms:conformsTo'?: dcterms.Standard;
    'dcat:contactPoint'?: vcard.Kind;
    'dcterms:creator'?: foaf.Agent;
    'dcterms:issued'?: string | Date;
    'dcterms:modified'?: string | Date;
    'dcterms:language'?: string;
    'dcterms:publisher'?: foaf.Agent;
    'dcterms:identifier'?: string;
    'dcat:theme'?: skos.Concept;
    'dcterms:type'?: string;
    'dcterms:relation'?: string | string[];
    'dcat:qualifiedRelation'?: IRelationship | IRelationship[];
    'dcat:keyword'?: string;
    'dcat:landingPage'?: string;
    'prov:qualifiedAttribution'?: prov.Attribution;
    'dcterms:license'?: string | string[];
    'dcterms:rights'?: string | string[];
    'dcterms:hasPart'?: IResource | IResource[];
    'odrl:hasPolicy'?: odrl.Policy | odrl.Policy[];
    'dcterms:isReferencedBy'?: IResource;
    'dcat:previousVersion'?: IResource;
    'dcat:hasVersion'?: IResource;
    'dcat:hasCurrentVersion'?: IResource;
    'dcterms:replaces'?: IResource;
    'dcat:version'?: string;
    'adms:versionNotes'?: string;
    'adms:status'?: string;
    'dcat:first'?: IResource;
    'dcat:last'?: IResource;
    'dcat:prev'?: IResource;
}

export class Resource implements IResource {
  public '@id'?: string;
  public '@context'?: string | Object;
  public '@type'?: string;
  public 'dcterms:title'?: string;
  public 'dcterms:description'?: string;
  public 'dcterms:accessRights'?: dcterms.RightsStatement;
  public 'dcterms:conformsTo'?: dcterms.Standard;
  public 'dcat:contactPoint'?: vcard.Kind;
  public 'dcterms:creator'?: foaf.Agent;
  public 'dcterms:issued'?: string | Date;
  public 'dcterms:modified'?: string | Date;
  public 'dcterms:language'?: string;
  public 'dcterms:publisher'?: foaf.Agent;
  public 'dcterms:identifier'?: string;
  public 'dcat:theme'?: skos.Concept;
  public 'dcterms:type'?: string;
  public 'dcterms:relation'?: string | string[];
  public 'dcat:qualifiedRelation'?: IRelationship | IRelationship[];
  public 'dcat:keyword'?: string;
  public 'dcat:landingPage'?: string;
  public 'prov:qualifiedAttribution'?: prov.Attribution;
  public 'dcterms:license'?: string | string[];
  public 'dcterms:rights'?: string | string[];
  public 'dcterms:hasPart'?: IResource | IResource[];
  public 'odrl:hasPolicy'?: odrl.Policy | odrl.Policy[];
  public 'dcterms:isReferencedBy'?: IResource;
  public 'dcat:previousVersion'?: IResource;
  public 'dcat:hasVersion'?: IResource;
  public 'dcat:hasCurrentVersion'?: IResource;
  public 'dcterms:replaces'?: IResource;
  public 'dcat:version'?: string;
  public 'adms:versionNotes'?: string;
  public 'adms:status'?: string;
  public 'dcat:first'?: IResource;
  public 'dcat:last'?: IResource;
  public 'dcat:prev'?: IResource;

  /**
   * Converts the Resource to a plain object
   * @returns {IResource} The plain object representation
   */
  public toJSON(): IResource {
    return {
      '@id': this['@id'],
      '@context': this['@context'],
      '@type': this['@type'],
      'dcterms:title': this['dcterms:title'],
      'dcterms:description': this['dcterms:description'],
      'dcterms:accessRights': this['dcterms:accessRights'],
      'dcterms:conformsTo': this['dcterms:conformsTo'],
      'dcat:contactPoint': this['dcat:contactPoint'],
      'dcterms:creator': this['dcterms:creator'],
      'dcterms:issued': this['dcterms:issued'],
      'dcterms:modified': this['dcterms:modified'],
      'dcterms:language': this['dcterms:language'],
      'dcterms:publisher': this['dcterms:publisher'],
      'dcterms:identifier': this['dcterms:identifier'],
      'dcat:theme': this['dcat:theme'],
      'dcterms:type': this['dcterms:type'],
      'dcterms:relation': this['dcterms:relation'],
      'dcat:qualifiedRelation': this['dcat:qualifiedRelation'],
      'dcat:keyword': this['dcat:keyword'],
      'dcat:landingPage': this['dcat:landingPage'],
      'prov:qualifiedAttribution': this['prov:qualifiedAttribution'],
      'dcterms:license': this['dcterms:license'],
      'dcterms:rights': this['dcterms:rights'],
      'dcterms:hasPart': this['dcterms:hasPart'],
      'odrl:hasPolicy': this['odrl:hasPolicy'],
      'dcterms:isReferencedBy': this['dcterms:isReferencedBy'],
      'dcat:previousVersion': this['dcat:previousVersion'],
      'dcat:hasVersion': this['dcat:hasVersion'],
      'dcat:hasCurrentVersion': this['dcat:hasCurrentVersion'],
      'dcterms:replaces': this['dcterms:replaces'],
      'dcat:version': this['dcat:version'],
      'adms:versionNotes': this['adms:versionNotes'],
      'adms:status': this['adms:status'],
      'dcat:first': this['dcat:first'],
      'dcat:last': this['dcat:last'],
      'dcat:prev': this['dcat:prev']
    };
  }
}
