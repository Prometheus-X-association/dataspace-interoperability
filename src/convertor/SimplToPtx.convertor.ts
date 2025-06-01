import { DataOffering, IDataOffering } from '../types/simpl/DataOffering';
import { DataResource } from '../types/ptx/DataResource';
import { DataRepresentation } from '../types/ptx/DataRepresentation';

export class PtxToSimplConvertor {
  public mapDataOfferingToDataResource(dataOffering: IDataOffering): DataResource {
    if (!dataOffering['@id']) {
      throw new Error('DataOffering must have an @id property');
    }

    const resource = new DataResource({
      _id: dataOffering['@id'],
      name: dataOffering['simpl:generalServiceProperties']['simpl:name'],
      description: dataOffering['simpl:generalServiceProperties']['simpl:description'],
      createdAt: new Date().toISOString(), // Since there's no creation date in the offering
      updatedAt: new Date().toISOString(), // Since there's no update date in the offering
      license: [dataOffering['simpl:offeringPrice']['simpl:license']['@value']],
      schema_version: '1.0.0', // Default version since not provided in offering
      policy: [
        dataOffering['simpl:servicePolicy']['simpl:access-policy'],
        dataOffering['simpl:servicePolicy']['simpl:usage-policy']
      ],
      producedBy: dataOffering['simpl:providerInformation']['simpl:providedBy'],
      category: '', // No direct mapping available
      copyrightOwnedBy: [], // No direct mapping available
      exposedThrough: [dataOffering['simpl:generalServiceProperties']['simpl:serviceAccessPoint']['@value']],
      representation: new DataRepresentation({
        _id: `${dataOffering['@id']}_representation`,
        resourceID: dataOffering['@id'],
        type: 'REST',
        url: dataOffering['simpl:generalServiceProperties']['simpl:serviceAccessPoint']['@value'],
        method: 'none', // Default value since not provided
        credential: '', // Default value since not provided
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    });

    return resource;
  }
} 