import { ICatalog } from '../dsp/Catalog';
import { Catalog } from '../dsp/Catalog';
/**
 * Represents an EDC requested Catalog.
 * @interface IEdcCatalog
 */
export interface IEdcCatalog extends ICatalog {
    'id'?: string;
    'isCatalog'?: string;
    'originator'?: string;
    'dspace:participantId'?: string;
    '@context'?: Object;
}

/**
 * Implementation of IEdcCatalog.
 * @class DataCatalog
 * @implements {IDataCatalog}
 */
export class EdcCatalog extends Catalog implements IEdcCatalog {
    public 'id'?: string;
    public 'isCatalog'?: string;
    public 'originator'?: string;
    public 'dspace:participantId'?: string;
    declare public '@context'?: Object;
    /**
     * Converts the instance to a JSON object.
     * @returns {IEdcCatalog} The JSON representation of the instance.
     */
    public toJSON(): IEdcCatalog {
        return {
            ...super.toJSON(),
            'dspace:participantId': this['dspace:participantId'],
            'id': this['id'],
            'isCatalog': this['isCatalog'],
            'originator': this['originator'],
            '@context': this['@context'],
        };
    }
}
