import axios from 'axios';
import { IDataResource } from '../types/ptx/DataResource';
import { ISoftwareResource } from '../types/ptx/SoftwareResource';
import { IServiceOffering } from '../types/ptx/ServiceOffering';
import { DataProduct } from '../types/gaia-x/DataProduct';
import { DataSet } from '../types/gaia-x/DataSet';
import { foaf } from '../types/dsp/foaf';
import { Distribution } from '../types/gaia-x/Distribution';
import { vcard } from '../types/gaia-x/vcard';
import { DataCatalog } from '../types/gaia-x/DataCatalog';
import { skos } from '../types/dsp/skos';
import { Relationship } from '../types/dsp/Relationship';

/**
 * Prometheus-X Catalog to Gaia-X Catalog converter
 */
export class PtxToGaiaXConvertor {
  /**
   * Map a Prometheus-X Data Resource to a Gaia-X Data Set
   * @param resource IDataResource
   * @return DataSet
   */
  public mapDataResourceToDataSet(resource: IDataResource): DataSet {
    const dataset = new DataSet({
      'dct:distributions': [],
      'dct:identifier': resource._id,
      'dct:description': resource.description,
      'dct:issued': resource.createdAt?.toString(),
      'dct:license': resource.license,
      'dct:title': resource.name,
      'gx:dataLicensors': [],
      'gx:dataUsageAgreement': [],
      'gx:expirationDateTime': undefined,
      'gx:exposedThrough': []
    });

    dataset['@id'] = resource._id;
    dataset['odrl:hasPolicy'] = resource.policy;
    dataset['@type'] = 'DataResource';
    dataset['dcterms:rights'] = resource.copyrightOwnedBy;
    dataset['dcterms:creator'] = new foaf.Agent({ account: resource.producedBy });
    const conceptScheme = new skos.ConceptScheme({
      themes: [],
      themeTaxonomy: ''
    });
    dataset['dcat:theme'] = new skos.Concept({
      inScheme: conceptScheme,
      topConceptOf: conceptScheme,
      definition: resource.category
    });

    if(resource.representation){
      const location = [];
      location.push(resource.representation?.url ?? '')
      const distribution = new Distribution({
        'dcat:language': '',
        'dct:format': '',
        'dct:issued': resource.representation.createdAt,
        'dct:license': resource.license,
        'dct:title': resource.name,
        'gx:dataLicensors': resource.producedBy,
        'gx:dataUsageAgreement': [],
        'gx:expirationDateTime': '',
        'gx:hash': '',
        'gx:hashAlgorithm': '',
        'gx:location': resource.country_or_region,
      });

      distribution['@id'] = resource.representation?._id;
      distribution['@type'] = 'ptx:representation'
      distribution['dcterms:issued'] = resource.representation?.createdAt;
      distribution['dcterms:modified'] = resource.representation?.updatedAt;
      distribution['dcterms:accessRights'] = resource.representation?.method;
      distribution['dcterms:rights'] = resource.representation?.credential;
      distribution['dcat:mediaType'] = resource.representation?.type;
      distribution['dcat:accessURL'] = resource.representation?.url;

      dataset['dct:distributions'].push(distribution);
    }

    if(resource.apiResponseRepresentation){
      const distribution = new Distribution({
        'dcat:language': '',
        'dct:format': '',
        'dct:issued': resource.apiResponseRepresentation.createdAt,
        'dct:license': resource.license,
        'dct:title': resource.name,
        'gx:dataLicensors': resource.producedBy,
        'gx:dataUsageAgreement': [],
        'gx:expirationDateTime': '',
        'gx:hash': '',
        'gx:hashAlgorithm': '',
        'gx:location': resource.country_or_region,
      });
      distribution['@id'] = resource.apiResponseRepresentation._id;
      distribution['@type'] = 'ptx:apiResponseRepresentation';
      distribution['dcterms:modified'] = resource.apiResponseRepresentation.updatedAt;
      distribution['dcterms:accessRights'] = resource.apiResponseRepresentation.method;
      distribution['dcterms:rights'] = resource.apiResponseRepresentation.credential;
      distribution['dcat:mediaType'] = resource.apiResponseRepresentation.type;
      dataset['dct:distributions'].push(distribution);
    }

    return dataset;
  }

  /**
   * Map a Prometheus-X Software Resource to a Gaia-X Data Set
   * @param resource ISoftwareResource
   * @return DataSet
   */
  public mapSoftwareResourceToDataSet(resource: ISoftwareResource): DataSet {
    const dataSet = new DataSet({
      'dct:description': resource.description,
      'dct:distributions': [],
      'dct:identifier': resource._id ?? '',
      'dct:issued': resource.createdAt,
      'dct:license': resource.license,
      'dct:title': resource.name,
      'gx:dataLicensors': resource.providedBy,
      'gx:dataUsageAgreement': [],
      'gx:expirationDateTime': undefined,
      'gx:exposedThrough': []
    });

    dataSet['@id'] = resource._id;
    dataSet['@type'] = 'SoftwareResource';
    dataSet['dcterms:modified'] = resource.updatedAt;
    dataSet['dcat:version'] = resource.schema_version;
    dataSet['odrl:hasPolicy'] = resource.policy;

    dataSet['dcterms:creator'] = new foaf.Agent({ account: resource.providedBy });
    const conceptScheme = new skos.ConceptScheme({
      themes: [],
      themeTaxonomy: ''
    });
    dataSet['dcat:theme'] = new skos.Concept({
      inScheme: conceptScheme,
      topConceptOf: conceptScheme,
      definition: resource.category
    });

    dataSet['dcterms:rights'] = resource.copyrightOwnedBy;

    dataSet['dcterms:hasPart'] = (resource.aggregationOf || []).map(
      (resourceId: string) => {
        const dataset = new DataSet({
          'dct:description': '',
          'dct:distributions': [],
          'dct:identifier': '',
          'dct:title': '',
          'gx:exposedThrough': []
        });
        dataset['@id'] = resourceId;
        return dataset;
      }
    );

    const countryCodes = resource.locationAddress.map(
      (element: { countryCode: any }) => element.countryCode
    );

    dataSet['dcterms:language'] = countryCodes.join(';');

    if (resource.representation) {
      const distribution = new Distribution({
        'dcat:language': '',
        'dct:format': '',
        'dct:issued': '',
        'dct:license': [],
        'dct:title': '',
        'gx:dataLicensors': [],
        'gx:dataUsageAgreement': [],
        'gx:expirationDateTime': '',
        'gx:hash': '',
        'gx:hashAlgorithm': '',
        'gx:location': resource.country_or_region || [],
      });

      distribution['@id'] = resource.representation._id;
      distribution['@type'] = 'ptx:representation';
      distribution['dcat:accessURL'] = resource.representation.url;
      distribution['dcterms:modified'] = resource.representation.updatedAt;
      distribution['dcterms:accessRights'] = resource.representation.method;
      distribution['dcterms:rights'] = resource.representation.credential;
      distribution['dcat:mediaType'] = resource.representation.type;

      dataSet['dct:distributions'].push(distribution);
    }

    return dataSet;
  }

  /**
   * Map a Prometheus-X Service Offering to a Gaia-X Data Product
   * @param resource IServiceOffering
   * @async
   * @return Promise<DataProduct>
   */
  public async mapServiceOfferingToDataProduct(resource: IServiceOffering): Promise<DataProduct> {

    const agent = new foaf.Agent({ account: resource.providedBy ?? '' });
    agent.account = resource.providedBy ?? '';

    const contact = new vcard.Kind();
    contact.url = resource.dependsOn ?? '';

    const datasets: DataSet[] = [];
    const relations: Relationship[] = [];

    for (const element of resource.aggregationOf) {
      const response = await axios.get(element);

      const relation = new Relationship();
      relation['dcat:hadRole'] = response.data['@type'];
      relation['dcterms:relation'] = element;
      relation['dcterms:description'] = response.data.description;
      relations.push(relation);

      if(response.data['@type'] === 'DataResource'){
        const dataset = this.mapDataResourceToDataSet(response.data);
        datasets.push(dataset);
      } else {
        const dataset = this.mapSoftwareResourceToDataSet(response.data);
        datasets.push(dataset);
      }
    }

    const dataProduct = new DataProduct(
      {
        'dct:identifier': resource._id ?? '',
        'dct:license': [],
        'gx:aggregationOf': datasets,
        'gx:providedBy': resource.providedBy ?? '',
        'gx:termsAndConditions': resource.termsAndConditions,
        'gx:title': resource.name ?? '',
        'gx:description':  resource.description ?? '',
        'odrl:hasPolicy':  resource.policy,
        'dct:issued':  resource.createdAt,
        'dcat:contactPoint':  contact,
        'dcterms:conformsTo':  resource.termsAndConditions,
        'gx:obsoleteDateTime': undefined,
        'gx:dataLicensors': [],
        'gx:dataUsageAgreement': [],
      }
    );

    dataProduct['@type'] = 'ServiceOffering';
    dataProduct['dcterms:modified'] = resource.updatedAt;
    dataProduct['dcat:version'] = resource.schema_version;
    dataProduct['dcat:keyword'] = resource.keywords.join(';') && resource.category.join(';');
    dataProduct['gx:aggregationOf'] = datasets;
    dataProduct['dcterms:creator'] = agent;

    dataProduct['dcat:qualifiedRelation'] = relations;

    dataProduct['dcterms:creator'] = new foaf.Agent({ account: resource.providedBy ?? '' });

    dataProduct['dcat:contactPoint'] = new vcard.Kind();
    dataProduct['dcat:contactPoint'].url = resource.dependsOn;
    dataProduct['dcterms:conformsTo'] = resource.termsAndConditions;

    return dataProduct;
  }

  /**
   * Map Prometheus-X Service Offerings to Gaia-X Data Products
   * @param resources any[]
   * @async
   * @return Promise<any[]>
   * @private
   */
  private async mapServiceOfferings(resources: any[]): Promise<any[]> {
    const mapping = [];
    for(const resource of resources){
      mapping.push(await this.mapServiceOfferingToDataProduct(resource));
    }

    return mapping;
  }

  /**
   * Map Prometheus-X Resources to Gaia-X Resources
   * @param dataResources any[]
   * @param softwareResources any[]
   * @return any[]
   * @private
   */
  private mapResources(dataResources: any[], softwareResources: any[]): any[] {
    const mapping = [];
    for(const dataResource of dataResources){
      mapping.push(this.mapDataResourceToDataSet(dataResource));
    }
    for(const softwareResource of softwareResources){
      mapping.push(this.mapSoftwareResourceToDataSet(softwareResource));
    }

    return mapping;
  }

  /**
   * Map a Prometheus-X Catalog to a Gaia-X Catalog
   * @param resources any[]
   * @async
   * @return Promise<DataCatalog>
   */
  public async mapPtxCatalogToGaiaXCatalog(resources: any[]): Promise<DataCatalog> {
    const serviceOfferings = resources.filter((element) =>  element['@type']?.toLowerCase() === 'serviceoffering');
    const dataResources = resources.filter((element) => element['@type']?.toLowerCase() === 'dataresource');
    const softwareResources = resources.filter((element) => element['@type']?.toLowerCase() === 'softwareresource');

    const catalog = new DataCatalog({
      'gx-trust-framework:getVerifiableCredentialsIDs': resources.map((element) => element._id).join(','),
    });

    catalog['@context'] = 'https://w3id.org/dspace/2024/1/context.json';
    catalog['@type'] = 'dcat:Catalog';
    catalog['dcat:resource'] = await this.mapServiceOfferings(serviceOfferings);
    catalog['dcat:dataset'] = this.mapResources(dataResources, softwareResources);
    catalog['foaf:homepage'] = 'catalog/offers';

    return catalog;
  }
}
