import {IDataResource} from '../types/ptx/DataResource';
import {ISoftwareResource} from '../types/ptx/SoftwareResource';
import {IServiceOffering} from '../types/ptx/ServiceOffering';
import {EdcDistribution} from '../types/edc/EdcDistribution';
import {EdcCatalog, IEdcCatalog} from '../types/edc/EdcCatalog';
import {EdcDataService} from '../types/edc/EdcDataService';
import {EdcDataset} from '../types/edc/EdcDataset';
import {IDataService} from '../types/dsp/DataService';
import {IDataRepresentation} from '../types/ptx/DataRepresentation';

/**
 * EDC Catalog to Prometheus-X Catalog converter
 */
export class EDCToPtxConvertor {
  /**
   * Map an EDC Dataset to a PTX Resource (Data or Software)
   * @param dataset EdcDataset
   * @param dataService IDataService
   * @returns IDataResource | IDataResource[]
   */
  private mapDatasetToResource(dataset: EdcDataset, dataService?: IDataService): { dataResources: IDataResource[], softwareResources: ISoftwareResource[] } {
    const distributions = Array.isArray(dataset['dcat:distribution']) 
      ? dataset['dcat:distribution'] as EdcDistribution[]
      : [];

    const dataResources: IDataResource[] = [];
    const softwareResources: ISoftwareResource[] = [];

    for (const distribution of distributions) {
      let resource: IDataResource | ISoftwareResource;
      const accessUrl = distribution['dcat:accessURL'] || 
                       (dataService as EdcDataService)?.['dcat:endpointURL'] || 
                       (dataService as EdcDataService)?.['dcat:endpointUrl'];

      if (!accessUrl) {
        continue;
      }

      if (distribution['dct:format'] && distribution['dct:format']['@id'] === 'HttpData-PULL') {
        // Create data resource for PULL
        resource = {
          _id: `${dataset['@id']}`,
          name: dataset['dcterms:title'],
          description: dataset['dcterms:description'],
          createdAt: dataset['dcterms:issued'],
          updatedAt: dataset['dcterms:modified'],
          license: dataset['dcterms:license'],
          schema_version: dataset['dcat:version'],
          policy: dataset['odrl:hasPolicy'],
          copyrightOwnedBy: dataset['dcterms:rights'],
          category: dataset['dcat:theme']?.definition,
          producedBy: dataset['dcterms:creator']?.account,
          representation: {
            url: accessUrl as string,
            input: {
              format: distribution['dcat:mediaType']
            }
          } as IDataRepresentation
        } as IDataResource;

        dataResources.push(resource);
      } else if (distribution['dct:format'] && distribution['dct:format']['@id'] === 'HttpData-PUSH') {
        // Create software resource for PUSH
        resource = {
          _id: `${dataset['@id']}`,
          name: dataset['dcterms:title'],
          description: dataset['dcterms:description'],
          createdAt: dataset['dcterms:issued'],
          updatedAt: dataset['dcterms:modified'],
          license: dataset['dcterms:license'],
          schema_version: dataset['dcat:version'],
          policy: dataset['odrl:hasPolicy'],
          copyrightOwnedBy: dataset['dcterms:rights'],
          category: dataset['dcat:theme']?.definition,
          providedBy: dataset['dcterms:creator']?.account,
          representation: {
            url: accessUrl as string,
            input: {
              format: distribution['dcat:mediaType']
            }
          } as IDataRepresentation,
          aggregationOf: Array.isArray(dataset['dcterms:hasPart']) 
            ? dataset['dcterms:hasPart'].map((part: any) => part['@id'])
            : [],
          locationAddress: dataset['dcterms:language']?.split(';').map((code: string) => ({
            countryCode: code
          })) || []
        } as ISoftwareResource;

        softwareResources.push(resource);
      } else {
        // Default to data resource if format is not specified
        resource = {
          _id: dataset['@id'],
          name: dataset['dcterms:title'],
          description: dataset['dcterms:description'],
          createdAt: dataset['dcterms:issued'],
          updatedAt: dataset['dcterms:modified'],
          license: dataset['dcterms:license'],
          schema_version: dataset['dcat:version'],
          policy: dataset['odrl:hasPolicy'],
          copyrightOwnedBy: dataset['dcterms:rights'],
          category: dataset['dcat:theme']?.definition,
          producedBy: dataset['dcterms:creator']?.account,
          representation: {
            url: accessUrl as string,
            input: {
              format: distribution['dcat:mediaType']
            }
          } as IDataRepresentation
        } as IDataResource;
        dataResources.push(resource);
      }
    }

    return {
      dataResources,
      softwareResources
    };
  }

  /**
   * Map an EDC Catalog to a PTX Service Offering
   * @param catalog EdcCatalog
   * @returns IServiceOffering
   */
  private mapCatalogToServiceOffering(catalog: EdcCatalog): IServiceOffering {
    const service = catalog['dcat:service'] as EdcDataService;
    const datasets = Array.isArray(catalog['dcat:dataset']) 
      ? catalog['dcat:dataset'] as EdcDataset[]
      : [];

    return {
      _id: catalog['@id'],
      name: service?.['dcat:endpointDescription'] || 'Service Offering',
      description: 'Service Offering from EDC Catalog',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      providedBy: catalog['dspace:participantId'],
      aggregationOf: datasets.map((dataset) => dataset['@id'])
    };
  }

  /**
   * Map an EDC Catalog to a PTX Catalog
   * @param catalog IEdcCatalog
   * @returns Object containing serviceOfferings, dataResources, and softwareResources
   */
  public mapEdcCatalogToPtxCatalog(catalog: IEdcCatalog): {
    serviceOfferings: IServiceOffering[];
    dataResources: IDataResource[];
    softwareResources: ISoftwareResource[];
  } {
    const serviceOfferings: IServiceOffering[] = [];
    const dataResources: IDataResource[] = [];
    const softwareResources: ISoftwareResource[] = [];

    // Process main catalog
    const subCatalogs = Array.isArray(catalog['dcat:catalog']) 
      ? catalog['dcat:catalog'] as EdcCatalog[]
      : [];

    for (const subCatalog of subCatalogs) {
      const serviceOffering = this.mapCatalogToServiceOffering(subCatalog);
      serviceOfferings.push(serviceOffering);

      // Process datasets in the sub-catalog
      const datasets = Array.isArray(subCatalog['dcat:dataset']) 
        ? subCatalog['dcat:dataset'] as EdcDataset[]
        : [];

      for (const dataset of datasets) {
        const service = Array.isArray(subCatalog['dcat:service']) 
          ? subCatalog['dcat:service'][0] 
          : subCatalog['dcat:service'];
        const {dataResources: dr, softwareResources: sr} = this.mapDatasetToResource(dataset, service);
        dataResources.push(...dr)
        softwareResources.push(...sr)
      }
    }

    return {
      serviceOfferings,
      dataResources,
      softwareResources
    };
  }
} 