import { expect } from 'chai';
import serviceOffering from './utils/ptx/serviceOffering.json';
import { PtxToEdcConvertor } from '../convertors/PtxToEDC.convertor';
import { mockDataResource, mockParticipant } from './utils/mock';
import { ICatalog } from '../types/dsp/Catalog';
import { IDataset } from '../types/dsp/Dataset';
import { IDistribution } from '../types/dsp/Distribution';

describe('Prometheus-X Catalog to EDC Catalog', function () {
  let convertor: PtxToEdcConvertor;

  beforeEach(function () {
    convertor = new PtxToEdcConvertor();
  });

  it('should map a Prometheus-X Catalog to an EDC Catalog', async function () {
    mockDataResource();
    mockParticipant();
    const mapping = await convertor.mapPtxCatalogToEdcCatalog([
      serviceOffering,
    ]);

    // Basic structure validation
    expect(mapping).to.exist;
    expect(mapping).to.be.an('object');
    expect(mapping['@type']).to.equal('dcat:Catalog');

    // Validate service
    expect(mapping['dcat:service']).to.be.an('object');
    expect(mapping['dcat:service']).to.have.property('@id', 'ptx:catalog');
    expect(mapping['dcat:service']).to.have.property('@type', 'dcat:DataService');
    expect(mapping['dcat:service']).to.have.property('dcat:endpointURL');
    expect(mapping['dcat:service']).to.have.property('dcat:endpointDescription', 'dspace:catalog');

    // Validate catalog entries
    expect(mapping['dcat:catalog']).to.be.an('array');
    const catalogs = mapping['dcat:catalog'] as ICatalog[];
    expect(catalogs).to.have.lengthOf(1);
    const catalog = catalogs[0];
    expect(catalog).to.have.property('@type', 'dcat:Catalog');
    expect(catalog).to.have.property('dcat:dataset').that.is.an('array');
    
    // Validate dataset in catalog
    const datasets = catalog['dcat:dataset'] as IDataset[];
    expect(datasets).to.have.lengthOf(1);
    const dataset = datasets[0];
    expect(dataset).to.have.property('@type', 'dcat:DataService');
    expect(dataset).to.have.property('dcterms:title', 'Provider');
    expect(dataset).to.have.property('dcterms:description', 'provider');
    expect(dataset).to.have.property('dcterms:creator').that.deep.includes({
      account: '66d18724ee71f9f096bae810'
    });

    // Validate distributions
    expect(dataset['dcat:distribution']).to.be.an('array');
    const distributions = dataset['dcat:distribution'] as IDistribution[];
    expect(distributions).to.have.lengthOf(2);
    expect(distributions[0]).to.have.property('dcat:accessURL', 'https://provider-api.com/users');
    expect(distributions[1]).to.have.property('dcat:accessURL', 'https://consumer-api.com/users');
    expect(distributions[0]['dcat:accessService']).to.have.property('@type', 'dcat:DataService');

    // Validate policies
    expect(dataset['odrl:hasPolicy']).to.be.an('array');
    const policies = dataset['odrl:hasPolicy'] as any[];
    expect(policies).to.have.lengthOf(1);
    expect(policies[0]).to.have.property('@id', 'https://registry.ptx/static/references/rules/rule-access-1.json');
    expect(policies[0]).to.have.property('title').that.deep.includes({
      '@type': 'xsd/string',
      '@value': 'No Restriction'
    });
    expect(policies[0].policy).to.have.property('permission').that.is.an('array');

    // Validate participant ID and originator
    expect(mapping['dspace:participantId']).to.equal('did:web:66d18724ee71f9f096bae810:provider');
    expect(mapping['originator']).to.equal('http://host.docker.internal:3333/');
  });
});