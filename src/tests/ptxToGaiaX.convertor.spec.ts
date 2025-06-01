import { expect } from 'chai';
import dataResource from './utils/ptx/dataResource.json'
import softwareResource from './utils/ptx/softwareResource.json'
import serviceOffering from './utils/ptx/serviceOffering.json'
import { mockDataResource } from './utils/mock';
import { PtxToGaiaXConvertor } from '../convertor/PtxToGaiaX.convertor';
import { foaf } from '../types/dsp/foaf';
import { skos } from '../types/dsp/skos';
import { vcard } from '../types/gaia-x/vcard';

describe('Prometheus-X Catalog to Gaia-X catalog', function () {

  let convertor: PtxToGaiaXConvertor;

  beforeEach(function () {
    convertor = new PtxToGaiaXConvertor();
  });

  it('should map a dataResource to a dataService', function () {
    const mapping = convertor.mapDataResourceToDataSet(dataResource)

    expect(mapping).to.exist;
    expect(mapping).to.be.an('object');

    expect(mapping).to.have.property('@id', dataResource._id);
    expect(mapping).to.have.property('@type', 'DataResource');
    expect(mapping).to.have.property('dct:title', dataResource.name);
    expect(mapping).to.have.property('dct:identifier', dataResource._id);
    expect(mapping).to.have.property('dct:description', dataResource.description);
    expect(mapping).to.have.property('dct:issued', dataResource.createdAt);
    expect(mapping).to.have.property('dct:license', dataResource.license);
    expect(mapping).to.have.property('odrl:hasPolicy', dataResource.policy);

    expect(mapping).to.have.property('dcterms:creator').that.is.an('object');
    expect(mapping['dcterms:creator']!).to.be.instanceof(foaf.Agent);

    expect(mapping).to.have.property('dcat:theme').that.is.an('object');
    expect(mapping['dcat:theme']!).to.be.instanceof(skos.Concept);
    expect(mapping['dcat:theme']!.definition).to.equal(dataResource.category);

    expect(mapping).to.have.property('dcterms:rights', dataResource.copyrightOwnedBy);
  });

  it('should map a softwareResource to a dataServices', async function () {
    const mapping = convertor.mapSoftwareResourceToDataSet(softwareResource)

    expect(mapping).to.exist;
    expect(mapping).to.be.an('object');

    expect(mapping).to.have.property('@id', softwareResource._id);
    expect(mapping).to.have.property('dct:identifier', softwareResource._id);
    expect(mapping).to.have.property('@type', 'SoftwareResource');
    expect(mapping).to.have.property('dct:title', softwareResource.name);
    expect(mapping).to.have.property('dct:description', softwareResource.description);
    expect(mapping).to.have.property('dct:issued', softwareResource.createdAt);
    expect(mapping).to.have.property('dcterms:modified', softwareResource.updatedAt);
    expect(mapping).to.have.property('dct:license', softwareResource.license);
    expect(mapping).to.have.property('dcat:version', softwareResource.schema_version);
    expect(mapping).to.have.property('odrl:hasPolicy', softwareResource.policy);

    expect(mapping).to.have.property('dcterms:creator').that.is.an('object');
    expect(mapping['dcterms:creator']!).to.be.instanceof(foaf.Agent);
    expect(mapping['dcterms:creator']!.account).to.equal(softwareResource.providedBy);

    expect(mapping).to.have.property('dcat:theme').that.is.an('object');
    expect(mapping['dcat:theme']!).to.be.instanceof(skos.Concept);
    expect(mapping['dcat:theme']!.definition).to.equal(softwareResource.category);

    expect(mapping).to.have.property('dcterms:rights', softwareResource.copyrightOwnedBy);
  });

  it('should map a serviceOffering to a dataSet', async function () {
    mockDataResource();

    const mapping = await convertor.mapServiceOfferingToDataProduct(serviceOffering)

    expect(mapping).to.exist;
    expect(mapping).to.be.an('object');

    expect(mapping).to.have.property('@type', 'ServiceOffering');
    expect(mapping).to.have.property('dct:identifier', serviceOffering._id);
    expect(mapping).to.have.property('gx:title', serviceOffering.name);
    expect(mapping).to.have.property('gx:description', serviceOffering.description);
    expect(mapping).to.have.property('dct:issued', serviceOffering.createdAt);
    expect(mapping).to.have.property('dcterms:modified', serviceOffering.updatedAt);
    expect(mapping).to.have.property('dcat:version', serviceOffering.schema_version);
    expect(mapping).to.have.property('odrl:hasPolicy', serviceOffering.policy);

    expect(mapping).to.have.property('dcterms:creator').that.is.an('object');
    expect(mapping['dcterms:creator']!).to.be.instanceof(foaf.Agent);
    expect(mapping['dcterms:creator']!.account).to.equal(serviceOffering.providedBy);

    expect(mapping).to.have.property('dcat:contactPoint').that.is.an('object');
    expect(mapping['dcat:contactPoint']!).to.be.instanceof(vcard.Kind);
    expect(mapping['dcat:contactPoint']!.url).to.equal(serviceOffering.dependsOn);
  });

  it('should map a Prometheus-X Catalog to a DCAT Catalog', async function () {
    const mapping = await convertor.mapPtxCatalogToGaiaXCatalog([
      serviceOffering,
      dataResource,
      softwareResource
    ])

    expect(mapping).to.exist;
    expect(mapping).to.be.an('object');

    expect(mapping).to.have.property('@context', 'https://w3id.org/dspace/2024/1/context.json');
    expect(mapping).to.have.property('@type', 'dcat:Catalog');
    expect(mapping).to.have.property('dcat:resource').that.is.an('array').that.is.not.empty;
    expect(mapping).to.have.property('dcat:dataset').that.is.an('array').that.is.not.empty;
    expect(mapping).to.have.property('foaf:homepage', 'catalog/offers');
    expect(mapping).to.have.property('gx-trust-framework:getVerifiableCredentialsIDs');
  });
});
