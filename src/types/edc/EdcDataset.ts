import { Catalog } from '../dsp/Catalog';
import { IDataset } from "../dsp/Dataset";
/**
 * Represents an EDC dataset.
 * @interface IEdcDataset
 */
export interface IEdcDataset extends IDataset {
}

/**
 * Implementation of IEdcCatalog.
 * @class EdcDataset
 * @implements {IEdcDataset}
 */
export class EdcDataset extends Catalog implements IEdcDataset {
    /**
     * Converts the instance to a JSON object.
     * @returns {IEdcCatalog} The JSON representation of the instance.
     */
    public toJSON(): IEdcDataset {
        return {
            ...super.toJSON(),
        };
    }
}
