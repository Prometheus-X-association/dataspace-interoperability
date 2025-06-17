import { expect } from 'chai';
import { EdcToPtxConvertor } from '../convertors/EdcToPtx.convertor';
import { mockDataResource, mockParticipant } from './utils/mock';
import catalog from './utils/edc/catalog.json';
import {IEdcCatalog} from "../types/edc/EdcCatalog";

describe('EDC Catalog to Prometheus-X Catalog', function () {
  let convertor: EdcToPtxConvertor;

  beforeEach(function () {
    convertor = new EdcToPtxConvertor();
  });

  it('should map an EDC Catalog to a Prometheus-X Catalog', async function () {
    mockDataResource();
    mockParticipant();

    const mapping = convertor.mapEdcCatalogToPtxCatalog(catalog[0] as IEdcCatalog);

    // Validate service offerings
    expect(mapping.serviceOfferings).to.be.an('array');
    expect(mapping.serviceOfferings[0]).to.have.property('_id');
    expect(mapping.serviceOfferings[0]).to.have.property('name');
    expect(mapping.serviceOfferings[0]).to.have.property('description');
    expect(mapping.serviceOfferings[0]).to.have.property('aggregationOf');

    // Validate data resources
    expect(mapping.dataResources).to.be.an('array');
    expect(mapping.dataResources[0]).to.have.property('_id');
    expect(mapping.dataResources[0]).to.have.property('name');
    expect(mapping.dataResources[0]).to.have.property('description');
    expect(mapping.dataResources[0]).to.have.property('producedBy');

    // Validate software resources
    expect(mapping.softwareResources).to.be.an('array');
    expect(mapping.softwareResources[0]).to.have.property('_id');
    expect(mapping.softwareResources[0]).to.have.property('name');
    expect(mapping.softwareResources[0]).to.have.property('description');
    expect(mapping.softwareResources[0]).to.have.property('providedBy');
  });
});