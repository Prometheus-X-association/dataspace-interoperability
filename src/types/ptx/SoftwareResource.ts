import { DataRepresentation, IDataRepresentation } from './DataRepresentation';

/**
 * Represents a Software Resource.
 * @interface ISoftwareResource
 * @property {IDataRepresentation} [representation] - The data representation.
 * @property {IDataRepresentation} [apiResponseRepresentation] - The API response representation.
 * @property {string | Date} [createdAt] - The creation date.
 * @property {string | Date} [updatedAt] - The last update date.
 * @property {any} [name] - The name of the resource.
 * @property {any} [description] - The description of the resource.
 * @property {any} [license] - The license information.
 * @property {any} [policy] - The policy information.
 * @property {any} [schema_version] - The schema version.
 * @property {any} [country_or_region] - The country or region.
 * @property {any} [copyrightOwnedBy] - The copyright owner.
 * @property {any} [category] - The category.
 * @property {any} [subCategories] - The subcategories.
 * @property {any} [exposedThrough] - The exposure information.
 * @property {any} [providedBy] - The provider information.
 * @property {any} [aggregationOf] - The aggregation information.
 * @property {any} [locationAddress] - The location address.
 * @property {any} [demo_link] - The demo link.
 */
export interface ISoftwareResource {
    _id?: string;
    representation?: IDataRepresentation;
    apiResponseRepresentation?: IDataRepresentation;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    name?: any;
    description?: any;
    license?: any;
    policy?: any;
    schema_version?: any;
    country_or_region?: any;
    copyrightOwnedBy?: any;
    category?: any;
    subCategories?: any;
    exposedThrough?: any;
    providedBy?: any;
    aggregationOf?: any;
    locationAddress?: any;
    demo_link?: any;
}

/**
 * Implementation of ISoftwareResource.
 * @class SoftwareResource
 * @implements {ISoftwareResource}
 */
export class SoftwareResource implements ISoftwareResource {
  public _id?: string;
  public representation?: DataRepresentation;
  public apiResponseRepresentation?: DataRepresentation;
  public createdAt?: string | Date;
  public updatedAt?: string | Date;
  public name?: any;
  public description?: any;
  public license?: any;
  public policy?: any;
  public schema_version?: any;
  public country_or_region?: any;
  public copyrightOwnedBy?: any;
  public category?: any;
  public subCategories?: any;
  public exposedThrough?: any;
  public providedBy?: any;
  public aggregationOf?: any;
  public locationAddress?: any;
  public demo_link?: any;

  /**
   * Constructs a new SoftwareResource instance.
   * @param init - The initialization object.
   */
  constructor(init: ISoftwareResource) {
    Object.assign(this, init);
  }

  /**
   * Converts the instance to a JSON object.
   * @returns {ISoftwareResource} The JSON representation of the instance.
   */
  public toJSON(): ISoftwareResource {
    return {
      _id: this._id,
      representation: this.representation,
      apiResponseRepresentation: this.apiResponseRepresentation,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      name: this.name,
      description: this.description,
      license: this.license,
      policy: this.policy,
      schema_version: this.schema_version,
      country_or_region: this.country_or_region,
      copyrightOwnedBy: this.copyrightOwnedBy,
      category: this.category,
      subCategories: this.subCategories,
      exposedThrough: this.exposedThrough,
      providedBy: this.providedBy,
      aggregationOf: this.aggregationOf,
      locationAddress: this.locationAddress,
      demo_link: this.demo_link
    };
  }
}
