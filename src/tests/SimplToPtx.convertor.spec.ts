import { expect } from 'chai';
import { SimplToPtxConvertor } from '../convertors/SimplToPtx.convertor';
import dataOffering from './utils/simpl/dataOffering.json';
import { IDataOffering } from '../types/simpl/DataOffering';

describe('Simpl Catalog to Prometheus-X Catalog', function () {
  let convertor: SimplToPtxConvertor;

  beforeEach(function () {
    convertor = new SimplToPtxConvertor();
  });

  it('should map a DataOffering to a DataResource', function () {
    const mapping = convertor.mapDataOfferingToDataResource(dataOffering as IDataOffering);

    expect(mapping).to.exist;
    expect(mapping).to.be.an('object');
    expect(mapping._id).to.equal(dataOffering['@id']);
    expect(mapping.name).to.equal(dataOffering['simpl:generalServiceProperties']['simpl:name']);
    expect(mapping.description).to.equal(dataOffering['simpl:generalServiceProperties']['simpl:description']);
    expect(mapping.license[0]).to.equal(dataOffering['simpl:offeringPrice']['simpl:license']['@value']);
    expect(mapping.policy).to.be.an('array');
    expect(mapping.policy[0]).to.equal(dataOffering['simpl:servicePolicy']['simpl:access-policy']);
    expect(mapping.policy[1]).to.equal(dataOffering['simpl:servicePolicy']['simpl:usage-policy']);
    expect(mapping.producedBy).to.equal(dataOffering['simpl:providerInformation']['simpl:providedBy']);
    expect(mapping.exposedThrough[0]).to.equal(dataOffering['simpl:generalServiceProperties']['simpl:serviceAccessPoint']['@value']);
    expect(mapping.representation).to.exist;
    expect(mapping?.representation?._id).to.equal(`${dataOffering['@id']}_representation`);
    expect(mapping?.representation?.resourceID).to.equal(dataOffering['@id']);
    expect(mapping?.representation?.type).to.equal('REST');
    expect(mapping?.representation?.url).to.equal(dataOffering['simpl:generalServiceProperties']['simpl:serviceAccessPoint']['@value']);
  });
});