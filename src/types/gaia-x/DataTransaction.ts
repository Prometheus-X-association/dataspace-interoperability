import { DataProductUsageContract, IDataProductUsageContract } from './DataProductUsageContract';
import { DataUsage, IDataUsage } from './DataUsage';

/**
 * Represents a Data Transaction.
 * @interface IDataTransaction
 * @property {'gx:dataProductUsageContract'} gx:dataProductUsageContract - The Data Product Usage Contract.
 * @property {'gx:dataUsage'} gx:dataUsage - The Data Usage.
 */
export interface IDataTransaction {
    'gx:dataProductUsageContract': IDataProductUsageContract;
    'gx:dataUsage': IDataUsage;
}

/**
 * Implementation of IDataTransaction.
 * @class DataTransaction
 * @implements {IDataTransaction}
 */
export class DataTransaction implements IDataTransaction{
  public 'gx:dataProductUsageContract': DataProductUsageContract;
  public 'gx:dataUsage': DataUsage;

  /**
   * Constructs a new DataTransaction instance.
   * @param init - The initialization object.
   */
  constructor(init: IDataTransaction) {
    Object.assign(this, init);
  }

  /**
   * Converts the instance to a JSON object.
   * @returns {IDataTransaction} The JSON representation of the instance.
   */
  public toJSON(): IDataTransaction {
    return {
      'gx:dataProductUsageContract': this['gx:dataProductUsageContract'],
      'gx:dataUsage': this['gx:dataUsage']
    };
  }
}
