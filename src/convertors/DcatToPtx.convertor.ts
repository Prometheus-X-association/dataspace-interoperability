import { DataResource, IDataResource } from '../types/ptx/DataResource';
import { IDataset } from '../types/dsp/Dataset';
import { IDataService } from '../types/dsp/DataService';
import { ISoftwareResource, SoftwareResource } from '../types/ptx/SoftwareResource';
import { IServiceOffering, ServiceOffering } from '../types/ptx/ServiceOffering';
import { ICatalog } from '../types/dsp/Catalog';
import { DataRepresentation } from '../types/ptx/DataRepresentation';

/**
 * DSP DCAT Catalog to Prometheus-X Catalog
 */
export class DcatToPtxConvertor {

  /**
   * map a DCAT Data Service to a Prometheus-X Data Resource
   * @param dataService IDataService
   * @return DataResource
   */
  public mapDataServiceToDataResource(dataService: IDataService): DataResource {
    if (!dataService['@id']) {
      throw new Error('DataService must have an @id property');
    }
    const resource = new DataResource({
      _id: dataService['@id'],
      name: dataService['dcterms:title'],
      description: dataService['dcterms:description'],
      createdAt: dataService['dcterms:issued'],
      updatedAt: dataService['dcterms:modified'],
      license: dataService['dcterms:license'],
      schema_version: dataService['dcat:version'],
      policy: dataService['odrl:hasPolicy'],
      producedBy: dataService['dcterms:creator']?.account,
      category: dataService['dcat:theme']?.definition,
      copyrightOwnedBy: dataService['dcterms:rights'],
      exposedThrough: dataService['dcat:endpointURL'],
    });

    const servesDataset = dataService['dcat:servesDataset'] ?? [];

    for (const dataset of servesDataset) {
            
      const distribution = dataset['dcat:distribution'];

      if (!distribution) continue;
      if (Array.isArray(distribution)) {
        throw new Error('Distribution cannot be an array');
      }

      const rep = new DataRepresentation({
        _id: distribution['@id'],
        resourceID: dataService['@id'],
        url: Array.isArray(distribution['dcat:accessURL']) ? distribution['dcat:accessURL'][0] : distribution['dcat:accessURL'],
        createdAt: distribution['dcterms:issued'],
        updatedAt: distribution['dcterms:modified'],
        method: distribution['dcterms:accessRights'],
        credential: distribution['dcterms:rights'],
        type: distribution['dcat:mediaType']
      });

      if (!resource.representation) {
        resource.representation = rep;
      } else if(!resource.apiResponseRepresentation) {
        resource.apiResponseRepresentation = rep;
      }
    }

    return resource;
  }

  /**
   * map a DCAT Data Service to a Prometheus-X Software Resource
   * @param dataService IDataService
   * @return SoftwareResource
   */
  public mapDataServiceToSoftwareResource(dataService: IDataService): SoftwareResource {
    if (!dataService['@id']) {
      throw new Error('DataService must have an @id property');
    }
    const resource = new SoftwareResource({
      _id: dataService['@id'],
      name: dataService['dcterms:title'],
      description: dataService['dcterms:description'],
      createdAt: dataService['dcterms:issued'],
      updatedAt: dataService['dcterms:modified'],
      license: dataService['dcterms:license'],
      schema_version: dataService['dcat:version'],
      policy: dataService['odrl:hasPolicy'],
      providedBy: dataService['dcterms:creator']?.account,
      category: dataService['dcat:theme']?.definition,
      copyrightOwnedBy: dataService['dcterms:rights'],
      exposedThrough: dataService['dcat:endpointURL'],
    });
  
    const servesDataset = dataService['dcat:servesDataset'] ?? [];
  
    for (const dataset of servesDataset) {
              
      const distribution = dataset['dcat:distribution'];
  
      if (!distribution) continue;
      if (Array.isArray(distribution)) {
        throw new Error('Distribution cannot be an array');
      }
  
      const rep = new DataRepresentation({
        _id: distribution['@id'],
        resourceID: dataService['@id'],
        url: Array.isArray(distribution['dcat:accessURL']) ? distribution['dcat:accessURL'][0] : distribution['dcat:accessURL'],
        createdAt: distribution['dcterms:issued'],
        updatedAt: distribution['dcterms:modified'],
        method: distribution['dcterms:accessRights'],
        credential: distribution['dcterms:rights'],
        type: distribution['dcat:mediaType']
      });
  
      if (!resource.representation) {
        resource.representation = rep;
      }
    }
  
    return resource;
  }

  /**
   * map a DCAT Data Set to a Prometheus-X Service Offering
   * @param dataset IDataset
   * @return ServiceOffering
   */
  public mapDataSetToServiceOffering(dataset: IDataset): ServiceOffering {
    const serviceOffering = new ServiceOffering({
      _id:  dataset['@id'],
      name:  dataset['dcterms:title'],
      description:  dataset['dcterms:description'],
      policy:  dataset['odrl:hasPolicy'],
      createdAt:  dataset['dcterms:issued'],
      updatedAt:  dataset['dcterms:modified'],
      schema_version:  dataset['dcat:version'],
      keywords:  dataset['dcat:keyword'],
      aggregationOf:  dataset['dcterms:hasPart']
    });

    if(Array.isArray(serviceOffering.aggregationOf)){
      serviceOffering.aggregationOf = serviceOffering.aggregationOf.map((element: { '@id': string }) => element['@id'])
    } else {
      const id = serviceOffering.aggregationOf['@id']
      serviceOffering.aggregationOf = [];
      serviceOffering.aggregationOf.push(id);
    }

    serviceOffering.providedBy = dataset['dcterms:creator']?.account;

    serviceOffering.location = dataset['dcterms:spatial'];
    serviceOffering.dependsOn = dataset['dcat:contactPoint']?.url;
    serviceOffering.termsAndConditions = dataset['dcterms:conformsTo'];


    return serviceOffering;
  }

  /**
   * map a DCAT Catalog to a Prometheus-X Service Offering
   * @param catalog ICatalog
   * @return {
   *       serviceOfferings: IServiceOffering[],
   *       dataResources: IDataResource[]
   *       softwareResources: ISoftwareResource[]
   *   }
   */
  public mapDcatCatalogToPtxCatalog(catalog: ICatalog): {
      serviceOfferings: IServiceOffering[],
      dataResources: IDataResource[]
      softwareResources: ISoftwareResource[]
  } {
    const serviceOfferings: IServiceOffering[] = [];
    const dataResources: IDataResource[] = [];
    const softwareResources: ISoftwareResource[] = [];

    if(catalog['dcat:dataset'] && Array.isArray(catalog['dcat:dataset'])){
      for(const dataset of catalog['dcat:dataset']){
        const mapping = this.mapDataSetToServiceOffering(dataset)
        serviceOfferings.push(mapping)
      }
    }

    if(catalog['dcat:service']){
      for(const dataService of catalog['dcat:service']){
        let mapping;
        if(dataService['@type'] === 'DataResource'){
          mapping = this.mapDataServiceToDataResource(dataService)
          dataResources.push(mapping)
        } else {
          mapping = this.mapDataServiceToSoftwareResource(dataService)
          softwareResources.push(mapping)
        }
      }
    }

    return {
      serviceOfferings,
      dataResources,
      softwareResources
    };
  }
}
