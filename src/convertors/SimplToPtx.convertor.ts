import { IDataOffering } from '../types/simpl/DataOffering';
import { DataResource } from '../types/ptx/DataResource';
import { DataRepresentation } from '../types/ptx/DataRepresentation';

/**
 * Simpl Catalog to Prometheus-X Catalog converter
 */
export class SimplToPtxConvertor {

  /**
   * Map a Simpl Data Offering to a Prometheus-X Data Resource
   * @param dataOffering IDataOffering
   * @return DataResource
   */
  public mapDataOfferingToDataResource(dataOffering: IDataOffering): DataResource {
    if (!dataOffering['@id']) {
      throw new Error('DataOffering must have an @id property');
    }

    return new DataResource({
      _id: dataOffering['@id'],
      name: dataOffering['simpl:generalServiceProperties']['simpl:name'],
      description: dataOffering['simpl:generalServiceProperties']['simpl:description'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      license: [dataOffering['simpl:offeringPrice']['simpl:license']['@value']],
      schema_version: '',
      policy: [
        dataOffering['simpl:servicePolicy']['simpl:access-policy'],
        dataOffering['simpl:servicePolicy']['simpl:usage-policy']
      ],
      producedBy: dataOffering['simpl:providerInformation']['simpl:providedBy'],
      category: '',
      copyrightOwnedBy: [],
      exposedThrough: [dataOffering['simpl:generalServiceProperties']['simpl:serviceAccessPoint']['@value']],
      representation: new DataRepresentation({
        _id: `${dataOffering['@id']}_representation`,
        resourceID: dataOffering['@id'],
        type: 'REST',
        url: dataOffering['simpl:generalServiceProperties']['simpl:serviceAccessPoint']['@value'],
        method: 'none',
        credential: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    });
  }
} 