import {DataService, IDataService} from "../dsp/DataService";
/**
 * Represents an EDC dataset.
 * @interface IEdcDataService
 */
export interface IEdcDataService extends IDataService {
    'dcat:endpointUrl'?: string
}

/**
 * Implementation of IEdcCatalog.
 * @class EdcDataService
 * @implements {IEdcDataService}
 */
export class EdcDataService extends DataService implements IEdcDataService {
    public 'dcat:endpointUrl'?: string;
    /**
     * Converts the instance to a JSON object.
     * @returns {IEdcCatalog} The JSON representation of the instance.
     */
    public toJSON(): IEdcDataService {
        return {
            ...super.toJSON(),
            'dcat:endpointUrl': this['dcat:endpointUrl'],
        };
    }
}
