/**
 * Represents a Data Usage.
 * @interface IDataUsage
 * @property {'gx:loggingService'} gx:loggingService - Link to the Logging Service.
 */
export interface IDataUsage {
    'gx:loggingService'?: string;
}

/**
 * Implementation of IDataUsage.
 * @class DataUsage
 * @implements {IDataUsage}
 */
export class DataUsage implements IDataUsage{
  public 'gx:loggingService'?: string;

  /**
   * Constructs a new DataUsage instance.
   * @param init - The initialization object.
   */
  constructor(init: IDataUsage) {
    Object.assign(this, init);
  }

  /**
   * Converts the instance to a JSON object.
   * @returns {IDataUsage} The JSON representation of the instance.
   */
  public toJSON(): IDataUsage {
    return {
      'gx:loggingService': this['gx:loggingService'],
    };
  }
}
