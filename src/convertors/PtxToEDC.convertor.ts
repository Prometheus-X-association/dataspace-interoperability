import axios from 'axios';
import {IDataResource} from '../types/ptx/DataResource';
import {Dataset} from '../types/dsp/Dataset';
import {DataService} from '../types/dsp/DataService';
import {foaf} from '../types/dsp/foaf';
import {skos} from '../types/dsp/skos';
import {ISoftwareResource} from '../types/ptx/SoftwareResource';
import {IServiceOffering} from '../types/ptx/ServiceOffering';
import {EdcDistribution, IEdcDistribution} from '../types/edc/EdcDistribution';
import {EdcCatalog} from '../types/edc/EdcCatalog';
import {EdcDataService} from '../types/edc/EdcDataService';
import {EdcDataset, IEdcDataset} from '../types/edc/EdcDataset';

/**
 * Prometheus-X Catalog to EDC Catalog converter
 */
export class PtxToEdcConvertor {

  /**
   * Map a Prometheus-X Service Offering to an EDC Data service
   * @param resource IServiceOffering
   * @param serviceOfferingId
   * @async
   * @return Promise<Catalog>
   */
  public async mapResourceToDataSet(resource: IDataResource | ISoftwareResource, serviceOfferingId?: string): Promise<EdcDataset> {
    const dataset = new Dataset();

    const distributions: EdcDistribution[] = [];

    if (resource.representation) {
      const distribution = new EdcDistribution();
      distribution['dcat:accessURL'] = resource.representation.url;
      distribution['dcat:mediaType'] = resource.representation.input?.format;
      const service = new EdcDataService()
      service['@id'] = serviceOfferingId;
      service['@type'] = 'dcat:DataService';
      distribution['dcat:accessService'] = service;
      distributions.push(distribution);
    }

    if (resource.apiResponseRepresentation) {
      const distribution = new EdcDistribution();
      distribution['dcat:accessURL'] = resource.apiResponseRepresentation.url;
      distribution['dcat:mediaType'] = resource.apiResponseRepresentation.input?.format;
      const service = new EdcDataService();
      service['@id'] = serviceOfferingId;
      service['@type'] = 'dcat:DataService';
      distribution['dcat:accessService'] = service;
      distributions.push(distribution);
    }

    dataset['@id'] = resource._id;
    dataset['@type'] = 'dcat:DataService';
    dataset['dcterms:title'] = resource.name;
    dataset['dcterms:description'] = resource.description;
    dataset['dcterms:issued'] = resource.createdAt;
    dataset['dcterms:modified'] = resource.updatedAt;
    dataset['dcterms:license'] = resource.license;
    dataset['dcat:version'] = resource.schema_version;
    dataset['odrl:hasPolicy'] = resource.policy;

    dataset['dcterms:creator'] = new foaf.Agent({ account: (resource as IDataResource)?.producedBy ? (resource as IDataResource)?.producedBy : (resource as ISoftwareResource)?.providedBy });

    dataset['dcat:theme'] = new skos.Concept({ definition: resource.category });
    dataset['dcat:distribution'] = distributions;

    dataset['dcterms:rights'] = resource.copyrightOwnedBy;

    dataset['dcterms:hasPart'] = ((resource as ISoftwareResource).aggregationOf || []).map(
        (resourceId: string) => {
          const dataset = new Dataset();
          dataset['@id'] = resourceId;
          return dataset;
        }
    );

    const countryCodes = (resource as ISoftwareResource)?.locationAddress?.map(
        (element: { countryCode: any }) => element.countryCode
    );
    dataset['dcterms:language'] = countryCodes?.join(';');

    return dataset;
  }

  /**
     * Map a Prometheus-X Service Offering to an EDC sub catalog
     * @param resource IServiceOffering
     * @async
     * @return Promise<Catalog>
     */
  public async mapServiceOfferingToSubCatalog(resource: IServiceOffering): Promise<EdcDataset> {
    const datasets: IEdcDataset[] = [];
    const catalog = new EdcCatalog();

    for (const element of resource.aggregationOf) {
      const response = await axios.get(element);

      const dataset = await this.mapResourceToDataSet(response.data, resource?._id);

      datasets.push(dataset);
    }

    catalog['@id'] = resource._id;
    catalog['@type'] = 'dcat:Catalog';
    catalog['dcat:dataset'] = datasets;
    catalog['dcat:catalog'] = [];
    catalog['dcat:distribution'] = [];
    //dataservice that represent the service offering
    const service = new EdcDataService();
    service['@id'] = resource._id;
    service['@type'] = 'dcat:DataService';
    catalog['dcat:service'] = service;
    catalog['dspace:participantId'] = resource._id;

    return catalog;
  }

  /**
   * Map Prometheus-X Resources to EDC Resources
   * @param serviceOfferings any[]
   * @return any[]
   * @private
   */
  private async mapResources(serviceOfferings: any[]): Promise<any[]> {
    const mapping = [];

    for (const serviceOffering of serviceOfferings) {
      mapping.push(await this.mapServiceOfferingToSubCatalog(serviceOffering));
    }
    return mapping;
  }

  /**
     * Map a Prometheus-X Catalog to a EDC Catalog
     * @param resources any[]
     * @async
     * @return Promise<ICatalog>
     */
  public async mapPtxCatalogToEdcCatalog(resources: any[]): Promise<EdcCatalog> {
    const serviceOfferings = resources.filter((element) =>  element['@type']?.toLowerCase() === 'serviceoffering');

    //must look if all resource and offer is provided by the same participant
    const participantId = serviceOfferings.map((e) => e.providedBy);

    const uniqueParticipant = [...new Set(participantId)];

    if(uniqueParticipant.length > 1){
      throw Error('The catalog must contain resource and offer for only one participant.')
    }

    //get the participant
    const response = await axios.get(`http://localhost:4040/v1/catalog/participants/${uniqueParticipant[0]}`);

    const catalog = new EdcCatalog();

    catalog['@id'] = response.data['_id'];
    catalog['@type'] = 'dcat:Catalog';

    catalog['@type'] = 'dcat:Catalog';
    catalog['dcat:dataset'] = new EdcDataset();

    const service  = new EdcDataService();
    service['@id'] = 'ptx:catalog';
    service['@type'] = 'dcat:DataService';
    service['dcat:endpointDescription'] = 'dspace:catalog';
    service['dcat:endpointURL'] = response.data['dataspaceEndpoint'];
    service['dcat:endpointUrl'] = response.data['dataspaceEndpoint'];

    catalog['dcat:catalog'] = await this.mapResources(serviceOfferings);

    catalog['dcat:distribution'] = [];
    catalog['dcat:service'] = service;

    catalog['dspace:participantId'] = response.data['did'] ?? response.data['_id'];
    catalog['originator'] = response.data['dataspaceEndpoint'];
    catalog['@context'] = {
      'dcat': 'http://www.w3.org/ns/dcat#',
      'dct': 'http://purl.org/dc/terms/',
      'odrl': 'http://www.w3.org/ns/odrl/2/',
      'dspace': 'https://w3id.org/dspace/v0.8/',
      '@vocab': 'https://w3id.org/edc/v0.0.1/ns/',
      'edc': 'https://w3id.org/edc/v0.0.1/ns/'
    };

    return catalog;
  }
}
