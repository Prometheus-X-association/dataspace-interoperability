/**
 * Represents a Service Offering.
 * @interface IServiceOffering
 * @property {string} [name] - The name of the service.
 * @property {string} [providedBy] - The provider of the service.
 * @property {string} [description] - The description of the service.
 * @property {string | Date} [createdAt] - The creation date.
 * @property {string | Date} [updatedAt] - The last update date.
 * @property {any} [schema_version] - The schema version.
 * @property {any} [policy] - The policy information.
 * @property {any} [keywords] - The keywords.
 * @property {any} [category] - The category.
 * @property {any} [dataResources] - The data resources.
 * @property {any} [softwareResources] - The software resources.
 * @property {any} [location] - The location information.
 * @property {any} [aggregationOf] - The aggregation information.
 * @property {any} [dependsOn] - The dependencies.
 * @property {any} [termsAndConditions] - The terms and conditions.
 */
export interface IServiceOffering {
    _id?: string;
    name?: string;
    providedBy?: string;
    description?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    schema_version?: any;
    policy?: any;
    keywords?: any;
    category?: any;
    dataResources?: any;
    softwareResources?: any;
    location?: any;
    aggregationOf?: any;
    dependsOn?: any;
    termsAndConditions?: any;
}

/**
 * Implementation of IServiceOffering.
 * @class ServiceOffering
 * @implements {IServiceOffering}
 */
export class ServiceOffering implements IServiceOffering {
  public _id?: string;
  public name?: string;
  public providedBy?: string;
  public description?: string;
  public createdAt?: string | Date;
  public updatedAt?: string | Date;
  public schema_version?: any;
  public policy?: any;
  public keywords?: any;
  public category?: any;
  public dataResources?: any;
  public softwareResources?: any;
  public location?: any;
  public aggregationOf?: any;
  public dependsOn?: any;
  public termsAndConditions?: any;

  /**
   * Constructs a new ServiceOffering instance.
   * @param init - The initialization object.
   */
  constructor(init: IServiceOffering) {
    Object.assign(this, init);
  }

  /**
   * Converts the instance to a JSON object.
   * @returns {IServiceOffering} The JSON representation of the instance.
   */
  public toJSON(): IServiceOffering {
    return {
      _id: this._id,
      name: this.name,
      providedBy: this.providedBy,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      schema_version: this.schema_version,
      policy: this.policy,
      keywords: this.keywords,
      category: this.category,
      dataResources: this.dataResources,
      softwareResources: this.softwareResources,
      location: this.location,
      aggregationOf: this.aggregationOf,
      dependsOn: this.dependsOn,
      termsAndConditions: this.termsAndConditions
    };
  }
}
