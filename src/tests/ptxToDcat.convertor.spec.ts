import { expect } from 'chai';
import dataResource from './utils/ptx/dataResource.json'
import softwareResource from './utils/ptx/softwareResource.json'
import serviceOffering from './utils/ptx/serviceOffering.json'
import { PtxToDcatConvertor } from '../convertors/PtxToDcat.convertor';
import { mockDataResource } from './utils/mock';

describe('Prometheus-X Catalog to DCAT catalog', function () {

  let convertor: PtxToDcatConvertor;

  beforeEach(function () {
    convertor = new PtxToDcatConvertor();
  });

  it('should map a dataResource to a dataService', function () {
    const mapping = convertor.mapDataResourceToDataService(dataResource)

    expect(mapping).to.exist;
    expect(mapping).to.be.an('object');

    expect(mapping).to.have.property('@id', dataResource._id);
    expect(mapping).to.have.property('@type', dataResource['@type']);
    expect(mapping).to.have.property('dcterms:title', dataResource.name);
    expect(mapping).to.have.property('dcterms:description', dataResource.description);
    expect(mapping).to.have.property('dcterms:issued', dataResource.createdAt);
    expect(mapping).to.have.property('dcterms:modified', dataResource.updatedAt);
    expect(mapping).to.have.property('dcterms:license').that.is.an('array').that.is.not.empty;
    expect(mapping).to.have.property('dcat:version', dataResource.schema_version);
    expect(mapping).to.have.property('odrl:hasPolicy').that.is.an('array').that.is.not.empty;

    expect(mapping).to.have.property('dcterms:creator').that.is.an('object');
    expect(mapping['dcterms:creator']).to.have.property('account', dataResource.producedBy);

    expect(mapping).to.have.property('dcat:theme').that.is.an('object');
    expect(mapping['dcat:theme']).to.have.property('definition', dataResource.category);

    expect(mapping).to.have.property('dcterms:rights').that.is.an('array').that.is.empty;
        
  });

  it('should map a softwareResource to a dataServices', async function () {
    const mapping = convertor.mapSoftwareResourceToDataService(softwareResource)

    expect(mapping).to.exist;
    expect(mapping).to.be.an('object');

    expect(mapping).to.have.property('@id', softwareResource._id);
    expect(mapping).to.have.property('@type', softwareResource['@type']);
    expect(mapping).to.have.property('dcterms:title', softwareResource.name);
    expect(mapping).to.have.property('dcterms:description', softwareResource.description);
    expect(mapping).to.have.property('dcterms:issued', softwareResource.createdAt);
    expect(mapping).to.have.property('dcterms:modified', softwareResource.updatedAt);
    expect(mapping).to.have.property('dcterms:license').that.is.an('array').that.is.empty;
    expect(mapping).to.have.property('dcat:version', softwareResource.schema_version);
    expect(mapping).to.have.property('odrl:hasPolicy').that.is.an('array').that.is.empty;

    expect(mapping).to.have.property('dcterms:creator').that.is.an('object');
    expect(mapping['dcterms:creator']).to.have.property('account', softwareResource.providedBy);

    expect(mapping).to.have.property('dcat:theme').that.is.an('object');
    expect(mapping['dcat:theme']).to.have.property('definition', softwareResource.category);

    expect(mapping).to.have.property('dcterms:rights').that.is.an('array').that.is.not.empty;
        
  });

  it('should map a serviceOffering to a dataSet', async function () {
    mockDataResource();

    const mapping = await convertor.mapServiceOfferingToDataSet(serviceOffering)

    expect(mapping).to.exist;
    expect(mapping).to.be.an('object');

    expect(mapping).to.have.property('@id', serviceOffering._id);
    expect(mapping).to.have.property('@type', serviceOffering['@type']);
    expect(mapping).to.have.property('dcterms:title', serviceOffering.name);
    expect(mapping).to.have.property('dcterms:description', serviceOffering.description);
    expect(mapping).to.have.property('dcterms:issued', serviceOffering.createdAt);
    expect(mapping).to.have.property('dcterms:modified', serviceOffering.updatedAt);
    expect(mapping).to.have.property('dcat:version', serviceOffering.schema_version);
    expect(mapping).to.have.property('odrl:hasPolicy').that.is.an('array').that.is.not.empty;

    expect(mapping).to.have.property('dcterms:creator').that.is.an('object');

    expect(mapping).to.have.property('dcterms:spatial', serviceOffering.location);
        
  });

  it('should map a Prometheus-X Catalog to a DCAT Catalog', async function () {
    const mapping = await convertor.mapPtxCatalogToDcatCatalog([
      serviceOffering,
      dataResource,
      softwareResource
    ])

    expect(mapping).to.exist;
    expect(mapping).to.be.an('object');

    expect(mapping).to.have.property('@context', 'https://w3id.org/dspace/2024/1/context.json');
    expect(mapping).to.have.property('@type', 'dcat:Catalog');
    expect(mapping).to.have.property('dcat:dataset').that.is.an('array').that.is.not.empty;
    expect(mapping).to.have.property('dcat:service').that.is.an('array').that.is.not.empty;
    expect(mapping).to.have.property('foaf:homepage', 'catalog/offers');
  });
});
