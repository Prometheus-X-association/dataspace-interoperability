import { Resource, IResource } from './Resource';

export interface IRelationship extends IResource {
    'dcat:hadRole'?: string;
}

export class Relationship extends Resource{
  public 'dcat:hadRole'?: string;
}
