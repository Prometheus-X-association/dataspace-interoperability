import { expect } from 'chai';
import { PtxToSimplConvertor } from '../convertors/PtxToSimpl.convertor';
import dataResource from './utils/ptx/dataResource.json';
import { DataResource } from '../types/ptx/DataResource';

describe('Prometheus-X Catalog to Simpl Catalog', function () {
  let convertor: PtxToSimplConvertor;

  beforeEach(function () {
    convertor = new PtxToSimplConvertor();
  });

  it('should map a DataResource to a DataOffering', function () {
    const mapping = convertor.mapDataOfferingToDataResource(dataResource as unknown as DataResource);

    expect(mapping).to.exist;
    expect(mapping).to.be.an('object');
    expect(mapping['@id']).to.equal(dataResource._id);
    expect(mapping['simpl:generalServiceProperties']['simpl:name']).to.equal(dataResource.name);
    expect(mapping['simpl:generalServiceProperties']['simpl:description']).to.equal(dataResource.description);
    expect(mapping['simpl:offeringPrice']['simpl:license']['@value']).to.equal(dataResource.license[0]);
    expect(mapping['simpl:servicePolicy']['simpl:access-policy'], '[]');
    expect(mapping['simpl:servicePolicy']['simpl:usage-policy']).to.not.be.empty;
    expect(mapping['simpl:providerInformation']['simpl:providedBy']).to.equal(dataResource.producedBy);
    expect(mapping['simpl:generalServiceProperties']['simpl:serviceAccessPoint']['@value']).to.equal(dataResource.exposedThrough);
  });
});