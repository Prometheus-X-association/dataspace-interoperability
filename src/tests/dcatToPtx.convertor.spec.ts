import { expect } from 'chai';
import { DcatToPtxConvertor } from '../convertor/DcatToPtx.convertor';
import dataService from './utils/dsp/dataService.json';
import dataService2 from './utils/dsp/dataService2.json';
import dataSet from './utils/dsp/dataSet.json';
import dcatCatalog from './utils/dsp/dcatCatalog.json';
import { ICatalog } from 'types/dsp/Catalog';

describe('DCAT Catalog to Prometheus-X Catalog', function () {
    
  let convertor: DcatToPtxConvertor;

  beforeEach(function () {
    convertor = new DcatToPtxConvertor();
  });

  it('should map a dataService to a dataResource', function () {
    const mapping = convertor.mapDataServiceToDataResource(dataService)
    expect(mapping).to.exist;
    expect(mapping).to.be.an('object');

    expect(mapping).to.have.property('_id', dataService['@id']);
    expect(mapping).to.have.property('representation').that.is.an('object').that.is.not.empty;
    expect(mapping).to.have.property('apiResponseRepresentation').that.is.an('object').that.is.not.empty;
  });

  it('should map a dataServices to a softwareResource', async function () {
    const mapping = convertor.mapDataServiceToSoftwareResource(dataService2)
    expect(mapping).to.exist;
    expect(mapping).to.be.an('object');

    expect(mapping).to.have.property('_id', dataService2['@id']);
    expect(mapping).to.have.property('representation').that.is.an('object').that.is.not.empty;
  });

  it('should map a dataSet to a serviceOffering', async function () {
    const mapping = convertor.mapDataSetToServiceOffering(dataSet)
    expect(mapping).to.exist;
    expect(mapping).to.be.an('object');

    expect(mapping).to.have.property('_id', dataSet['@id']);
    expect(mapping).to.have.property('policy').that.is.an('array').that.is.not.empty;
  });

  it('should map a DCAT Catalog to a Prometheus-X Catalog', async function () {
    const mapping = convertor.mapDcatCatalogToPtxCatalog(dcatCatalog as ICatalog)
    expect(mapping).to.exist;
    expect(mapping).to.be.an('object');

    expect(mapping).to.have.property('serviceOfferings').that.is.an('array').that.is.not.empty;
    expect(mapping).to.have.property('dataResources').that.is.an('array').that.is.not.empty;
    expect(mapping).to.have.property('softwareResources').that.is.an('array').that.is.not.empty;
  });
});
