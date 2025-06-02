import axios from 'axios';
import { IDataResource } from '../types/ptx/DataResource';
import { Dataset } from '../types/dsp/Dataset';
import { DataService } from '../types/dsp/DataService';
import { foaf } from '../types/dsp/foaf';
import { skos } from '../types/dsp/skos';
import { ISoftwareResource } from '../types/ptx/SoftwareResource';
import { IServiceOffering } from '../types/ptx/ServiceOffering';
import { Catalog, ICatalog } from '../types/dsp/Catalog';
import { Distribution } from '../types/dsp/Distribution';
import { Relationship } from '../types/dsp/Relationship';
import { vcard } from '../types/dsp/vcard';

/**
 * Prometheus-X Catalog to DCAT Catalog converter
 */
export class PtxToDcatConvertor {

  /**
   * Map a Prometheus-X Data Resource to a DCAT Data Service
   * @param resource IDataResource
   * @return Dataset
   */
  public mapDataResourceToDataService(resource: IDataResource): Dataset {
    const dataService = new DataService();
    dataService['@id'] = resource._id;
    dataService['@type'] = 'DataResource';
    dataService['dcterms:title'] = resource.name;
    dataService['dcterms:description'] = resource.description;
    dataService['dcterms:issued'] = resource.createdAt;
    dataService['dcterms:modified'] = resource.updatedAt;
    dataService['dcterms:license'] = resource.license;
    dataService['dcat:version'] = resource.schema_version;
    dataService['odrl:hasPolicy'] = resource.policy;

    dataService['dcterms:creator'] = new foaf.Agent({ account: resource.producedBy });

    dataService['dcat:theme'] = new skos.Concept({ definition: resource.category });

    dataService['dcterms:rights'] = resource.copyrightOwnedBy;
    dataService['dcat:endpointURL'] = resource.exposedThrough;

    dataService['dcat:servesDataset'] = [];

    if(resource.representation){
      const representation = new Dataset();
      const distribution = new Distribution();

      distribution['dcat:accessURL'] = resource.representation?.url;
      distribution['@id'] = resource.representation?._id;
      distribution['@type'] = 'ptx:representation'
      distribution['dcterms:issued'] = resource.representation?.createdAt;
      distribution['dcterms:modified'] = resource.representation?.updatedAt;
      distribution['dcterms:accessRights'] = resource.representation?.method;
      distribution['dcterms:rights'] = resource.representation?.credential;
      distribution['dcat:mediaType'] = resource.representation?.type;

      representation['dcat:distribution'] = distribution;
      dataService['dcat:servesDataset'].push(representation);
    }

    if(resource.apiResponseRepresentation){
      const apiResponseRepresentation = new Dataset();
      const distribution = new Distribution();

      distribution['dcat:accessURL'] = resource.apiResponseRepresentation?.url;
      distribution['@id'] = resource.apiResponseRepresentation?._id;
      distribution['@type'] = 'ptx:apiResponseRepresentation'
      distribution['dcterms:issued'] = resource.apiResponseRepresentation?.createdAt;
      distribution['dcterms:modified'] = resource.apiResponseRepresentation?.updatedAt;
      distribution['dcterms:accessRights'] = resource.apiResponseRepresentation?.method;
      distribution['dcterms:rights'] = resource.apiResponseRepresentation?.credential;
      distribution['dcat:mediaType'] = resource.apiResponseRepresentation?.type;

      apiResponseRepresentation['dcat:distribution'] = distribution;
      dataService['dcat:servesDataset'].push(apiResponseRepresentation);

    }

    return dataService;
  }

  /**
   * Map a Prometheus-X Software Resource to a DCAT Data Service
   * @param resource ISoftwareResource
   * @return DataService
   */
  public mapSoftwareResourceToDataService(resource: ISoftwareResource): DataService {
    const dataService = new DataService();
    dataService['@id'] = resource._id;
    dataService['@type'] = 'SoftwareResource';
    dataService['dcterms:title'] = resource.name;
    dataService['dcterms:description'] = resource.description;
    dataService['dcterms:issued'] = resource.createdAt;
    dataService['dcterms:modified'] = resource.updatedAt;
    dataService['dcterms:license'] = resource.license;
    dataService['dcat:version'] = resource.schema_version;
    dataService['odrl:hasPolicy'] = resource.policy;

    dataService['dcterms:creator'] = new foaf.Agent({ account: resource.providedBy });

    dataService['dcat:theme'] = new skos.Concept({ definition: resource.category });

    dataService['dcterms:rights'] = resource.copyrightOwnedBy;

    dataService['dcterms:hasPart'] = (resource.aggregationOf || []).map(
      (resourceId: string) => {
        const dataset = new Dataset();
        dataset['@id'] = resourceId;
        return dataset;
      }
    );

    const countryCodes = resource.locationAddress.map(
      (element: { countryCode: any }) => element.countryCode
    );
    dataService['dcterms:language'] = countryCodes.join(';');
    dataService['dcat:endpointURL'] = resource.exposedThrough;
    dataService['dcat:endpointDescription'] = resource.demo_link;

    dataService['dcat:servesDataset'] = [];

    if(resource.representation){
      const representation = new Dataset();
      const distribution = new Distribution();

      distribution['dcat:accessURL'] = resource.representation?.url;
      distribution['@id'] = resource.representation?._id;
      distribution['@type'] = 'ptx:representation'
      distribution['dcterms:issued'] = resource.representation?.createdAt;
      distribution['dcterms:modified'] = resource.representation?.updatedAt;
      distribution['dcterms:accessRights'] = resource.representation?.method;
      distribution['dcterms:rights'] = resource.representation?.credential;
      distribution['dcat:mediaType'] = resource.representation?.type;

      representation['dcat:distribution'] = distribution;
      dataService['dcat:servesDataset'].push(representation);
    }

    return dataService;
  }

  /**
   * Map a Prometheus-X Service Offering to a DCAT Data Set
   * @param resource IServiceOffering
   * @async
   * @return Promise<Catalog>
   */
  public async mapServiceOfferingToDataSet(resource: IServiceOffering): Promise<Catalog> {
    const dataset = new Dataset();

    const distributions: Distribution[] = [];
    const relations: Relationship[] = [];

    for (const element of resource.aggregationOf) {
      const response = await axios.get(element);

      const relation = new Relationship();
      relation['dcat:hadRole'] = response.data['@type'];
      relation['dcterms:relation'] = element;
      relation['dcterms:description'] = response.data.description;
      relations.push(relation);

      if (response.data.representation) {
        const distribution = new Distribution();
        distribution['dcat:accessURL'] = response.data.representation.url;
        distribution['dcat:mediaType'] = response.data.representation.fileType;
        distribution['dcat:accessService'] =
                    response.data['@type'] === 'SoftwareResource'
                      ? this.mapSoftwareResourceToDataService(response.data)
                      : response.data['@type'] === 'DataResource'
                        ? this.mapDataResourceToDataService(response.data)
                        : new DataService();
        distributions.push(distribution);
      }

      if (response.data.apiResponseRepresentation) {
        const distribution = new Distribution();
        distribution['dcat:accessURL'] = response.data.apiResponseRepresentation.url;
        distribution['dcat:mediaType'] = response.data.apiResponseRepresentation.fileType;
        distribution['dcat:accessService'] =
                    response.data['@type'] === 'SoftwareResource'
                      ? this.mapSoftwareResourceToDataService(response.data)
                      : response.data['@type'] === 'DataResource'
                        ? this.mapDataResourceToDataService(response.data)
                        : new DataService();
        distributions.push(distribution);
      }
    }

    dataset['@id'] = resource._id;
    dataset['@type'] = 'ServiceOffering';
    dataset['dcterms:title'] = resource.name ?? '';
    dataset['dcterms:description'] = resource.description ?? '';
    dataset['dcterms:identifier'] = resource._id;

    dataset['odrl:hasPolicy'] = resource.policy;
    dataset['dcterms:issued'] = resource.createdAt;
    dataset['dcterms:modified'] = resource.updatedAt;
    dataset['dcat:version'] = resource.schema_version;
    dataset['dcat:keyword'] = resource.keywords.join(';') && resource.category.join(';');

    dataset['dcterms:hasPart'] = resource.aggregationOf;
    dataset['dcat:distribution'] = distributions;
    dataset['dcat:qualifiedRelation'] = relations;

    dataset['dcterms:creator'] = new foaf.Agent({ account: resource.providedBy ?? '' });
    dataset['dcterms:spatial'] = resource.location;
    dataset['dcat:contactPoint'] = new vcard.Kind(resource.dependsOn);
    dataset['dcterms:conformsTo'] = resource.termsAndConditions;

    return dataset;
  }

  /**
   * Map Prometheus-X Service Offerings to DCAT Data Sets
   * @param resources any[]
   * @async
   * @return Promise<any[]>
   * @private
   */
  private async mapServiceOfferings(resources: any[]): Promise<any[]> {
    const mapping = [];
    for(const resource of resources){
      mapping.push(await this.mapServiceOfferingToDataSet(resource));
    }

    return mapping;
  }

  /**
   * Map Prometheus-X Resources to DCAT Resources
   * @param dataResources any[]
   * @param softwareResources any[]
   * @return any[]
   * @private
   */
  private mapResources(dataResources: any[], softwareResources: any[]): any[] {
    const mapping = [];
    for(const dataResource of dataResources){
      mapping.push(this.mapDataResourceToDataService(dataResource));
    }
    for(const softwareResource of softwareResources){
      mapping.push(this.mapSoftwareResourceToDataService(softwareResource));
    }

    return mapping;
  }

  /**
   * Map a Prometheus-X Catalog to a DCAT Catalog
   * @param resources any[]
   * @async
   * @return Promise<ICatalog>
   */
  public async mapPtxCatalogToDcatCatalog(resources: any[]): Promise<Catalog> {
    const serviceOfferings = resources.filter((element) =>  element['@type']?.toLowerCase() === 'serviceoffering');
    const dataResources = resources.filter((element) => element['@type']?.toLowerCase() === 'dataresource');
    const softwareResources = resources.filter((element) => element['@type']?.toLowerCase() === 'softwareresource');

    const catalog = new Catalog();
    
    catalog['@context'] = 'https://w3id.org/dspace/2024/1/context.json';
    catalog['@type'] = 'dcat:Catalog';
    catalog['dcat:dataset'] = await this.mapServiceOfferings(serviceOfferings);
    catalog['dcat:service'] = this.mapResources(dataResources, softwareResources);
    catalog['foaf:homepage'] = 'catalog/offers';

    return catalog;
  }
}
