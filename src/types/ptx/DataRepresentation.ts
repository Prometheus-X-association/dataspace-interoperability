/**
 * Represents a Data Representation.
 * @interface IDataRepresentation
 * @property {string} [_id] - The unique identifier.
 * @property {string} [type] - The type of representation.
 * @property {string} [url] - The URL of the representation.
 * @property {string} [method] - The HTTP method.
 * @property {string} [credential] - The credential information.
 * @property {string | Date} [createdAt] - The creation date.
 * @property {string | Date} [updatedAt] - The last update date.
 */
export interface IDataRepresentation {
    _id?: string;
    type?: string;
    resourceID?: string;
    url?: string;
    method?: string;
    credential?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    // Input/Output parameters
    input?: {
        format?: string,
        description?: string,
        snippet?: string,
        size?: string,
    },
    output?: {
        format?: string,
        description?: string,
        snippet?: string,
    },
    // Processing time
    processingTime?: string,
}

/**
 * Implementation of IDataRepresentation.
 * @class DataRepresentation
 * @implements {IDataRepresentation}
 */
export class DataRepresentation implements IDataRepresentation {
  public _id?: string;
  public type?: string;
  public resourceID?: string;
  public url?: string;
  public method?: string;
  public credential?: string;
  public createdAt?: string | Date;
  public updatedAt?: string | Date;
    // Input/Output parameters
  public input?: {
      format?: string;
      description?: string;
      snippet?: string;
      size?: string;
  };
 public output?: {
     format?: string;
     description?: string;
     snippet?: string;
 };
    // Processing time
    public processingTime?: string;

  /**
   * Constructs a new DataRepresentation instance.
   * @param init - The initialization object.
   */
  constructor(init: IDataRepresentation) {
    Object.assign(this, init);
  }

  /**
   * Converts the instance to a JSON object.
   * @returns {IDataRepresentation} The JSON representation of the instance.
   */
  public toJSON(): IDataRepresentation {
    return {
      _id: this._id,
      type: this.type,
      resourceID: this.type,
      url: this.url,
      method: this.method,
      credential: this.credential,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      input: this.input,
      output: this.output,
      processingTime: this.processingTime,
    };
  }
}
