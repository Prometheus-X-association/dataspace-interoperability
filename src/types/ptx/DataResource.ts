import { DataRepresentation, IDataRepresentation } from './DataRepresentation';

/**
 * Represents a Data Resource.
 * @interface IDataResource
 * @property {IDataRepresentation} [representation] - The data representation.
 * @property {IDataRepresentation} [apiResponseRepresentation] - The API response representation.
 * @property {string | Date} [createdAt] - The creation date.
 * @property {string | Date} [updatedAt] - The last update date.
 * @property {any} [name] - The name of the resource.
 * @property {any} [description] - The description of the resource.
 * @property {any} [license] - The license information.
 * @property {any} [policy] - The policy information.
 * @property {any} [producedBy] - The producer information.
 * @property {any} [schema_version] - The schema version.
 * @property {any} [country_or_region] - The country or region.
 * @property {any} [copyrightOwnedBy] - The copyright owner.
 * @property {any} [category] - The category.
 * @property {any} [subCategories] - The subcategories.
 * @property {any} [exposedThrough] - The exposure information.
 */
export interface IDataResource {
    representation?: IDataRepresentation;
    apiResponseRepresentation?: IDataRepresentation;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    name?: any;
    description?: any;
    _id?: any;
    license?: any;
    policy?: any;
    producedBy?: any;
    schema_version?: any;
    country_or_region?: any;
    copyrightOwnedBy?: any;
    category?: any;
    subCategories?: any;
    exposedThrough?: any;
}

/**
 * Implementation of IDataResource.
 * @class DataResource
 * @implements {IDataResource}
 */
export class DataResource implements IDataResource {
  public _id?: string;
  public representation?: DataRepresentation;
  public apiResponseRepresentation?: DataRepresentation;
  public createdAt?: string | Date;
  public updatedAt?: string | Date;
  public name?: any;
  public description?: any;
  public license?: any;
  public policy?: any;
  public producedBy?: any;
  public schema_version?: any;
  public country_or_region?: any;
  public copyrightOwnedBy?: any;
  public category?: any;
  public subCategories?: any;
  public exposedThrough?: any;

  /**
   * Constructs a new DataResource instance.
   * @param init - The initialization object.
   */
  constructor(init: IDataResource) {
    Object.assign(this, init);
  }

  /**
   * Converts the instance to a JSON object.
   * @returns {IDataResource} The JSON representation of the instance.
   */
  public toJSON(): IDataResource {
    return {
      representation: this.representation,
      apiResponseRepresentation: this.apiResponseRepresentation,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      name: this.name,
      description: this.description,
      license: this.license,
      policy: this.policy,
      producedBy: this.producedBy,
      schema_version: this.schema_version,
      country_or_region: this.country_or_region,
      copyrightOwnedBy: this.copyrightOwnedBy,
      category: this.category,
      subCategories: this.subCategories,
      exposedThrough: this.exposedThrough
    };
  }
}

