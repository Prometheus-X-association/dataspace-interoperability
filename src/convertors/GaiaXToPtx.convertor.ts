import { DataResource, IDataResource } from '../types/ptx/DataResource';
import { ISoftwareResource, SoftwareResource } from '../types/ptx/SoftwareResource';
import { IServiceOffering, ServiceOffering } from '../types/ptx/ServiceOffering';
import { DataProduct } from '../types/gaia-x/DataProduct';
import { IDataSet } from '../types/gaia-x/DataSet';
import { DataCatalog } from '../types/gaia-x/DataCatalog';
import { DataRepresentation } from '../types/ptx/DataRepresentation';

/**
 * Gaia-X Catalog to Prometheus-X Catalog converter
 */
export class GaiaXToPtxConvertor {
  /**
   * Map a Gaia-X Data Set to a Prometheus-X Data Resource
   * @param dataSet IDataSet
   * @return DataResource
   */
  public mapDataSetToDataResource(dataSet: IDataSet): DataResource {
    if (!dataSet['@id']) {
      throw new Error('dataSet must have an @id property');
    }
    const resource = new DataResource({
      _id: dataSet['dct:identifier'],
      name: dataSet['dct:title'],
      description: dataSet['dct:description'],
      createdAt: dataSet['dct:issued'],
      updatedAt: dataSet['dcterms:modified'],
      license: dataSet['dct:license'],
      schema_version: dataSet['dcat:version'],
      policy: dataSet['odrl:hasPolicy'],
      producedBy: dataSet['dcterms:creator']?.account,
      category: dataSet['dcat:theme']?.definition,
      copyrightOwnedBy: dataSet['dcterms:rights'],
      exposedThrough: dataSet['gx:exposedThrough'],
    });

    const distributions = dataSet['dct:distributions'];
  
    if (Array.isArray(distributions)) {
      for (const distribution of distributions) {
        const rep = new DataRepresentation({
          _id: distribution['@id'],
          resourceID: dataSet['@id'],
          url: Array.isArray(distribution['dcat:accessURL']) ? distribution['dcat:accessURL'][0] : distribution['dcat:accessURL'],
          createdAt: distribution['dct:issued'],
          updatedAt: distribution['dcterms:modified'],
          method: distribution['dcterms:accessRights'],
          credential: distribution['dcterms:rights'],
          type: distribution['dcat:mediaType']
        });
        if (!resource.representation) {
          resource.representation = rep;
        } else if (!resource.apiResponseRepresentation) {
          resource.apiResponseRepresentation = rep;
        }
      }
    }
  
    return resource;
  }

  /**
   * Map a Gaia-X Data Set to a Prometheus-X Software Resource
   * @param resource IDataSet
   * @return SoftwareResource
   */
  public mapDataSetToSoftwareResource(resource: IDataSet): SoftwareResource {
    if (!resource['@id']) {
      throw new Error('resource must have an @id property');
    }
    const softwareResource = new SoftwareResource({
      _id: resource['@id'],
      name: resource['dct:title'],
      description: resource['dct:description'],
      createdAt: resource['dct:issued'],
      updatedAt: resource['dcterms:modified'],
      license: resource['dct:license'],
      schema_version: resource['dcat:version'],
      policy: resource['odrl:hasPolicy'],
      providedBy: resource['dcterms:creator']?.account,
      category: resource['dcat:theme']?.definition,
      copyrightOwnedBy: resource['dcterms:rights'],
      exposedThrough: resource['gx:exposedThrough'],
    });

    const distributions = resource['dct:distributions'];
    if (Array.isArray(distributions)) {
      for (const distribution of distributions) {
        const rep = new DataRepresentation({
          _id: distribution['@id'],
          resourceID: resource['@id'],
          url: Array.isArray(distribution['dcat:accessURL']) ? distribution['dcat:accessURL'][0] : distribution['dcat:accessURL'],
          createdAt: distribution['dct:issued'],
          updatedAt: distribution['dcterms:modified'],
          method: distribution['dcterms:accessRights'],
          credential: distribution['dcterms:rights'],
          type: distribution['dcat:mediaType']
        });
        if (!softwareResource.representation) {
          softwareResource.representation = rep;
        } else if (!softwareResource.apiResponseRepresentation) {
          softwareResource.apiResponseRepresentation = rep;
        }
      }
    }

    return softwareResource;
  }

  /**
   * Map a Gaia-X Data Product to a Prometheus-X Service Offering
   * @param resource DataProduct
   * @async
   * @return Promise<ServiceOffering>
   */
  public async mapDataProductToServiceOffering(resource: DataProduct): Promise<ServiceOffering> {
    if (!resource['@id']) {
      throw new Error('resource must have an @id property');
    }
    const serviceOffering = new ServiceOffering({
      _id: resource['@id'],
      name: resource['gx:title'],
      description: resource['gx:description'],
      createdAt: resource['dct:issued'],
      updatedAt: resource['dcterms:modified'],
      schema_version: resource['dcat:version'],
      policy: resource['odrl:hasPolicy'],   
      providedBy: resource['dcterms:creator']?.account,
      category: resource['dcat:theme']?.definition,
      termsAndConditions: resource['dcterms:conformsTo'],
    });

    serviceOffering.dataResources = [];
    serviceOffering.softwareResources = [];

    const datasets = resource['gx:aggregationOf'];
    if (Array.isArray(datasets)) {
      for (const dataset of datasets) {
        if(dataset['@type'] === 'DataResource'){
          const dataResource = this.mapDataSetToDataResource(dataset as IDataSet);
          serviceOffering.dataResources.push(dataResource);
        } else {
          const softwareResource = this.mapDataSetToSoftwareResource(dataset as IDataSet);
          serviceOffering.softwareResources.push(softwareResource);
        }
      }
    }

    return serviceOffering;
  }

  /**
   * Map a Gaia-X Catalog to a Prometheus-X Catalog
   * @param catalog DataCatalog
   * @async
   * @return Promise<{
   *       serviceOfferings: IServiceOffering[],
   *       dataResources: IDataResource[]
   *       softwareResources: ISoftwareResource[]
   *   }>
   */
  async mapGaiaXCatalogToPtxCatalog(catalog: DataCatalog): Promise<{
        serviceOfferings: IServiceOffering[],
        dataResources: IDataResource[]
        softwareResources: ISoftwareResource[]
    }> {
    const serviceOfferings: IServiceOffering[] = [];
    const dataResources: IDataResource[] = [];
    const softwareResources: ISoftwareResource[] = [];

    if (catalog['dcat:resource'] && Array.isArray(catalog['dcat:resource'])) {
      for (const dataProduct of catalog['dcat:resource']) {
        const mapping = await this.mapDataProductToServiceOffering(dataProduct as DataProduct)
        serviceOfferings.push(mapping)
      }
    }

    if (catalog['dcat:dataset']) {
      if(Array.isArray(catalog['dcat:dataset'])){
        for (const dataset of catalog['dcat:dataset']) {
          let mapping;
          if (dataset['@type'] === 'DataResource') {
            mapping = this.mapDataSetToDataResource(dataset as IDataSet)
            dataResources.push(mapping)
          } else {
            mapping = this.mapDataSetToSoftwareResource(dataset as IDataSet)
            softwareResources.push(mapping)
          }
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
