import { IDistribution } from '../dsp/Distribution';
import { Distribution } from '../dsp/Distribution';
import {IResource, Resource} from "../dsp/Resource";
/**
 * Represents an EDC Distribution.
 * @interface IEdcDistribution
 */
export interface IEdcDistribution extends IDistribution {
    'dct:format'?: IResource
}

/**
 * Implementation of IEdcDistribution.
 * @class DataDistribution
 * @implements {EdcDistribution}
 */
export class EdcDistribution extends Distribution implements IEdcDistribution {
    public 'dct:format'?: Resource;
    /**
     * Converts the instance to a JSON object.
     * @returns {IEdcDistribution} The JSON representation of the instance.
     */
    public toJSON(): IEdcDistribution {
        return {
            ...super.toJSON(),
            'dct:format': this['dct:format'],
        };
    }
}
