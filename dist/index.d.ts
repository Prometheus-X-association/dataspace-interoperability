interface IDataRepresentation {
    _id?: string;
    type?: string;
    resourceID?: string;
    url?: string;
    method?: string;
    credential?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    input?: {
        format?: string;
        description?: string;
        snippet?: string;
        size?: string;
    };
    output?: {
        format?: string;
        description?: string;
        snippet?: string;
    };
    processingTime?: string;
}
declare class DataRepresentation implements IDataRepresentation {
    _id?: string;
    type?: string;
    resourceID?: string;
    url?: string;
    method?: string;
    credential?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    input?: {
        format?: string;
        description?: string;
        snippet?: string;
        size?: string;
    };
    output?: {
        format?: string;
        description?: string;
        snippet?: string;
    };
    processingTime?: string;
    constructor(init: IDataRepresentation);
    toJSON(): IDataRepresentation;
}

interface IDataResource {
    representation?: IDataRepresentation;
    apiResponseRepresentation?: IDataRepresentation;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    name?: any;
    description?: any;
    _id?: any;
    license?: any;
    policy?: any;
    producedBy?: any;
    schema_version?: any;
    country_or_region?: any;
    copyrightOwnedBy?: any;
    category?: any;
    subCategories?: any;
    exposedThrough?: any;
}
declare class DataResource implements IDataResource {
    _id?: string;
    representation?: DataRepresentation;
    apiResponseRepresentation?: DataRepresentation;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    name?: any;
    description?: any;
    license?: any;
    policy?: any;
    producedBy?: any;
    schema_version?: any;
    country_or_region?: any;
    copyrightOwnedBy?: any;
    category?: any;
    subCategories?: any;
    exposedThrough?: any;
    constructor(init: IDataResource);
    toJSON(): IDataResource;
}

interface ISoftwareResource {
    _id?: string;
    representation?: IDataRepresentation;
    apiResponseRepresentation?: IDataRepresentation;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    name?: any;
    description?: any;
    license?: any;
    policy?: any;
    schema_version?: any;
    country_or_region?: any;
    copyrightOwnedBy?: any;
    category?: any;
    subCategories?: any;
    exposedThrough?: any;
    providedBy?: any;
    aggregationOf?: any;
    locationAddress?: any;
    demo_link?: any;
}
declare class SoftwareResource implements ISoftwareResource {
    _id?: string;
    representation?: DataRepresentation;
    apiResponseRepresentation?: DataRepresentation;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    name?: any;
    description?: any;
    license?: any;
    policy?: any;
    schema_version?: any;
    country_or_region?: any;
    copyrightOwnedBy?: any;
    category?: any;
    subCategories?: any;
    exposedThrough?: any;
    providedBy?: any;
    aggregationOf?: any;
    locationAddress?: any;
    demo_link?: any;
    constructor(init: ISoftwareResource);
    toJSON(): ISoftwareResource;
}

interface IServiceOffering {
    _id?: string;
    name?: string;
    providedBy?: string;
    description?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    schema_version?: any;
    policy?: any;
    keywords?: any;
    category?: any;
    dataResources?: any;
    softwareResources?: any;
    location?: any;
    aggregationOf?: any;
    dependsOn?: any;
    termsAndConditions?: any;
}
declare class ServiceOffering implements IServiceOffering {
    _id?: string;
    name?: string;
    providedBy?: string;
    description?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    schema_version?: any;
    policy?: any;
    keywords?: any;
    category?: any;
    dataResources?: any;
    softwareResources?: any;
    location?: any;
    aggregationOf?: any;
    dependsOn?: any;
    termsAndConditions?: any;
    constructor(init: IServiceOffering);
    toJSON(): IServiceOffering;
}

interface ISignatureCheckType {
    'gx:participantRole': string;
    'gx:mandatory': string;
    'gx:legalValidity': string;
}
declare class SignatureCheckType implements ISignatureCheckType {
    'gx:participantRole': string;
    'gx:mandatory': string;
    'gx:legalValidity': string;
    constructor(init: ISignatureCheckType);
    toJSON(): ISignatureCheckType;
}

interface IDataUsageAgreement {
    'gx:producedBy': string;
    'gx:providedBy': string;
    'gx:licensedBy'?: string[];
    'gx:dataUsageAgreementTrustAnchor': string;
    'gx:dataProduct': string;
    'gx:signers': ISignatureCheckType[];
}
declare class DataUsageAgreement implements IDataUsageAgreement {
    'gx:producedBy': string;
    'gx:providedBy': string;
    'gx:licensedBy'?: string[];
    'gx:dataUsageAgreementTrustAnchor': string;
    'gx:dataProduct': string;
    'gx:signers': SignatureCheckType[];
    constructor(init: IDataUsageAgreement);
    toJSON(): IDataUsageAgreement;
}

interface IDatasetSeries {
}

declare class RightsStatement {
}

type Standard = string | string[];

declare class PeriodOfTime {
}

declare namespace dcterms {
    class RightsStatement extends RightsStatement {
    }
    type Standard = Standard;
    class PeriodOfTime extends PeriodOfTime {
    }
}

declare class Policy {
}

declare namespace odrl {
    class Policy extends Policy {
    }
}

declare class Concept {
    inScheme?: skos.ConceptScheme;
    topConceptOf?: skos.ConceptScheme;
    definition: any;
    constructor(init: {
        inScheme?: skos.ConceptScheme;
        topConceptOf?: skos.ConceptScheme;
        definition: any;
    });
}

declare class ConceptScheme {
    themes: skos.Concept[];
    themeTaxonomy: string;
    constructor(init: {
        themes?: skos.Concept[];
        themeTaxonomy?: string;
    });
}

declare namespace skos {
    class Concept extends Concept {
    }
    class ConceptScheme extends ConceptScheme {
    }
}

declare class Agent {
    account: string;
    constructor(init: {
        account?: string;
    });
}

declare class Person {
    name: string;
    homepage: string;
    constructor(init: {
        name?: string;
        homepage?: string;
    });
}

declare class Organization {
    name: string;
    homepage: string;
    constructor(init: {
        name?: string;
        homepage?: string;
    });
}

declare namespace foaf {
    class Agent extends Agent {
    }
    class Person extends Person {
    }
    class Organization extends Organization {
    }
}

declare class Kind {
    url: string | string[];
    constructor(init: {
        url: string | string[];
    });
}

declare namespace vcard {
    class Kind extends Kind {
    }
}

declare class Attribution {
}

declare namespace prov {
    class Attribution extends Attribution {
    }
}

interface IRelationship extends IResource {
    'dcat:hadRole'?: string;
}

interface IResource {
    '@id'?: string;
    '@context'?: string | Object;
    '@type'?: string;
    'dcterms:title'?: string;
    'dcterms:description'?: string;
    'dcterms:accessRights'?: dcterms.RightsStatement;
    'dcterms:conformsTo'?: dcterms.Standard;
    'dcat:contactPoint'?: vcard.Kind;
    'dcterms:creator'?: foaf.Agent;
    'dcterms:issued'?: string | Date;
    'dcterms:modified'?: string | Date;
    'dcterms:language'?: string;
    'dcterms:publisher'?: foaf.Agent;
    'dcterms:identifier'?: string;
    'dcat:theme'?: skos.Concept;
    'dcterms:type'?: string;
    'dcterms:relation'?: string | string[];
    'dcat:qualifiedRelation'?: IRelationship | IRelationship[];
    'dcat:keyword'?: string;
    'dcat:landingPage'?: string;
    'prov:qualifiedAttribution'?: prov.Attribution;
    'dcterms:license'?: string | string[];
    'dcterms:rights'?: string | string[];
    'dcterms:hasPart'?: IResource | IResource[];
    'odrl:hasPolicy'?: odrl.Policy | odrl.Policy[];
    'dcterms:isReferencedBy'?: IResource;
    'dcat:previousVersion'?: IResource;
    'dcat:hasVersion'?: IResource;
    'dcat:hasCurrentVersion'?: IResource;
    'dcterms:replaces'?: IResource;
    'dcat:version'?: string;
    'adms:versionNotes'?: string;
    'adms:status'?: string;
    'dcat:first'?: IResource;
    'dcat:last'?: IResource;
    'dcat:prev'?: IResource;
}
declare class Resource implements IResource {
    '@id'?: string;
    '@context'?: string | Object;
    '@type'?: string;
    'dcterms:title'?: string;
    'dcterms:description'?: string;
    'dcterms:accessRights'?: dcterms.RightsStatement;
    'dcterms:conformsTo'?: dcterms.Standard;
    'dcat:contactPoint'?: vcard.Kind;
    'dcterms:creator'?: foaf.Agent;
    'dcterms:issued'?: string | Date;
    'dcterms:modified'?: string | Date;
    'dcterms:language'?: string;
    'dcterms:publisher'?: foaf.Agent;
    'dcterms:identifier'?: string;
    'dcat:theme'?: skos.Concept;
    'dcterms:type'?: string;
    'dcterms:relation'?: string | string[];
    'dcat:qualifiedRelation'?: IRelationship | IRelationship[];
    'dcat:keyword'?: string;
    'dcat:landingPage'?: string;
    'prov:qualifiedAttribution'?: prov.Attribution;
    'dcterms:license'?: string | string[];
    'dcterms:rights'?: string | string[];
    'dcterms:hasPart'?: IResource | IResource[];
    'odrl:hasPolicy'?: odrl.Policy | odrl.Policy[];
    'dcterms:isReferencedBy'?: IResource;
    'dcat:previousVersion'?: IResource;
    'dcat:hasVersion'?: IResource;
    'dcat:hasCurrentVersion'?: IResource;
    'dcterms:replaces'?: IResource;
    'dcat:version'?: string;
    'adms:versionNotes'?: string;
    'adms:status'?: string;
    'dcat:first'?: IResource;
    'dcat:last'?: IResource;
    'dcat:prev'?: IResource;
    toJSON(): IResource;
}

interface IDataset extends IResource {
    'dcat:distribution'?: IDistribution$1 | IDistribution$1[];
    'dcterms:accrualPeriodicity'?: string;
    'dcat:inSeries'?: IDatasetSeries;
    'dcterms:spatial'?: string;
    'dcat:spatialResolutionInMeters'?: number;
    'dcterms:temporal'?: dcterms.PeriodOfTime;
    'dcat:temporalResolution'?: string;
}
declare class Dataset extends Resource implements IDataset {
    'dcat:distribution'?: IDistribution$1 | IDistribution$1[];
    'dcterms:accrualPeriodicity'?: string;
    'dcat:inSeries'?: IDatasetSeries;
    'dcterms:spatial'?: string;
    'dcat:spatialResolutionInMeters'?: number;
    'dcterms:temporal'?: dcterms.PeriodOfTime;
    'dcat:temporalResolution'?: string;
    toJSON(): IDataset;
}

interface IEdcDataService extends IDataService {
    'dcat:endpointUrl'?: string;
}

interface IDataService extends IResource {
    'dcat:endpointURL'?: string | string[];
    'dcat:endpointDescription'?: string;
    'dcat:servesDataset'?: IDataset[];
}
declare class DataService extends Resource implements IDataService {
    'dcat:endpointURL'?: string | string[];
    'dcat:endpointDescription'?: string;
    'dcat:servesDataset'?: IDataset[];
    toJSON(): IEdcDataService;
}

interface IDistribution$1 {
    '@id'?: string;
    '@type'?: string;
    'dcterms:title'?: string;
    'dcterms:description'?: string;
    'dcterms:issued'?: string | Date;
    'dcterms:modified'?: string | Date;
    'dcterms:license'?: string;
    'dcterms:accessRights'?: string;
    'dcterms:rights'?: string;
    'odrl:hasPolicy'?: boolean;
    'dcat:accessURL'?: string | string[];
    'dcat:downloadURL'?: string | string[];
    'dcat:accessService'?: IDataService;
    'dcat:byteSize'?: number;
    'dcat:spatialResolutionInMeters'?: string;
    'dcat:temporalResolution'?: string;
    'dcterms:conformsTo'?: string;
    'dcat:mediaType'?: string;
    'dcterms:format'?: string;
    'dcat:compressFormat'?: string;
    'dcat:packageFormat'?: string;
}
declare class Distribution$1 implements IDistribution$1 {
    '@id'?: string;
    '@type'?: string;
    'dcterms:title'?: string;
    'dcterms:description'?: string;
    'dcterms:issued'?: string | Date;
    'dcterms:modified'?: string | Date;
    'dcterms:license'?: string;
    'dcterms:accessRights'?: string;
    'dcterms:rights'?: string;
    'odrl:hasPolicy'?: boolean;
    'dcat:accessURL'?: string | string[];
    'dcat:downloadURL'?: string | string[];
    'dcat:accessService'?: IDataService;
    'dcat:byteSize'?: number;
    'dcat:spatialResolutionInMeters'?: string;
    'dcat:temporalResolution'?: string;
    'dcterms:conformsTo'?: string;
    'dcat:mediaType'?: string;
    'dcterms:format'?: string;
    'dcat:compressFormat'?: string;
    'dcat:packageFormat'?: string;
    toJSON(): IDistribution$1;
}

interface IDistribution extends Omit<IDistribution$1, 'dcat:compressFormat' | 'dcat:packageFormat'> {
    'dct:title': string;
    'dct:format': string;
    'gx:location'?: string[];
    'gx:hash'?: string;
    'gx:hashAlgorithm'?: string;
    'dct:issued'?: Date | string;
    'gx:expirationDateTime'?: string;
    'dcat:language'?: string;
    'dct:license'?: string[];
    'gx:dataLicensors'?: string[];
    'gx:dataUsageAgreement'?: IDataUsageAgreement[];
}
declare class Distribution extends Distribution$1 implements IDistribution {
    'dct:title': string;
    'dct:format': string;
    'gx:location'?: string[];
    'gx:hash'?: string;
    'gx:hashAlgorithm'?: string;
    'dct:issued'?: string;
    'gx:expirationDateTime'?: string;
    'dcat:language'?: string;
    'dct:license'?: string[];
    'gx:dataLicensors'?: string[];
    'gx:dataUsageAgreement'?: DataUsageAgreement[];
    constructor(init: IDistribution);
    toJSON(): IDistribution;
}

interface IDataSet extends IDataset {
    'dct:title'?: string;
    'dct:description'?: string;
    'dct:distributions'?: IDistribution[];
    'dct:identifier'?: string;
    'dct:issued'?: Date | string;
    'gx:expirationDateTime'?: Date;
    'dct:license'?: string[];
    'gx:dataLicensors'?: string[];
    'gx:dataUsageAgreement'?: IDataUsageAgreement[];
    'gx:exposedThrough'?: string[];
}
declare class DataSet extends Dataset implements IDataSet {
    'dct:title': string;
    'dct:description': string;
    'dct:distributions': Distribution[];
    'dct:identifier': string;
    'dct:issued'?: Date | string;
    'gx:expirationDateTime'?: Date;
    'dct:license'?: string[];
    'gx:dataLicensors'?: string[];
    'gx:dataUsageAgreement'?: DataUsageAgreement[];
    'gx:exposedThrough': string[];
    constructor(init: IDataSet);
    toJSON(): IDataSet;
}

interface IDataUsage {
    'gx:loggingService'?: string;
}
declare class DataUsage implements IDataUsage {
    'gx:loggingService'?: string;
    constructor(init: IDataUsage);
    toJSON(): IDataUsage;
}

interface IDataProduct extends IResource {
    'gx:providedBy': string;
    'gx:termsAndConditions': string;
    'dct:license': string[];
    'gx:title': string;
    'gx:description'?: string;
    'dct:issued'?: Date | string;
    'gx:obsoleteDateTime'?: Date;
    'gx:dataLicensors'?: string[];
    'gx:dataUsageAgreement'?: IDataUsage[];
    'gx:aggregationOf': IDataSet[];
    'dct:identifier': string;
}
declare class DataProduct extends Resource implements IDataProduct {
    'gx:providedBy': string;
    'gx:termsAndConditions': string;
    'dct:license': string[];
    'gx:title': string;
    'gx:description'?: string;
    'dct:issued'?: Date;
    'gx:obsoleteDateTime'?: Date;
    'gx:dataLicensors'?: string[];
    'gx:dataUsageAgreement'?: DataUsage[];
    'gx:aggregationOf': DataSet[];
    'dct:identifier': string;
    constructor(init: IDataProduct);
    toJSON(): IDataProduct;
}

interface ICatalog$1 extends IDataset {
    'foaf:homepage'?: string;
    'dcat:themeTaxonomy'?: string[];
    'dcat:resource'?: IResource | IResource[];
    'dcat:dataset'?: IDataset | IDataset[];
    'dcat:service'?: IDataService | IDataService[];
    'dcat:catalog'?: ICatalog$1 | ICatalog$1[];
}
declare class Catalog$1 extends Dataset implements ICatalog$1 {
    'foaf:homepage'?: string;
    'dcat:themeTaxonomy'?: string[];
    'dcat:resource'?: IResource | IResource[];
    'dcat:dataset'?: IDataset | IDataset[];
    'dcat:service'?: IDataService | IDataService[];
    'dcat:catalog'?: ICatalog$1 | ICatalog$1[];
    toJSON(): ICatalog$1;
}

interface IDataCatalog extends ICatalog$1 {
    'gx-trust-framework:getVerifiableCredentialsIDs': string;
}
declare class DataCatalog extends Catalog$1 implements IDataCatalog {
    'gx-trust-framework:getVerifiableCredentialsIDs': string;
    constructor(init: IDataCatalog);
    toJSON(): IDataCatalog;
}

declare class PtxToGaiaXConvertor {
    mapDataResourceToDataSet(resource: IDataResource): DataSet;
    mapSoftwareResourceToDataSet(resource: ISoftwareResource): DataSet;
    mapServiceOfferingToDataProduct(resource: IServiceOffering): Promise<DataProduct>;
    private mapServiceOfferings;
    private mapResources;
    mapPtxCatalogToGaiaXCatalog(resources: any[]): Promise<DataCatalog>;
}

declare class GaiaXToPtxConvertor {
    mapDataSetToDataResource(dataSet: IDataSet): DataResource;
    mapDataSetToSoftwareResource(resource: IDataSet): SoftwareResource;
    mapDataProductToServiceOffering(resource: DataProduct): Promise<ServiceOffering>;
    mapGaiaXCatalogToPtxCatalog(catalog: DataCatalog): Promise<{
        serviceOfferings: IServiceOffering[];
        dataResources: IDataResource[];
        softwareResources: ISoftwareResource[];
    }>;
}

declare class PtxToDcatConvertor {
    mapDataResourceToDataService(resource: IDataResource): Dataset;
    mapSoftwareResourceToDataService(resource: ISoftwareResource): DataService;
    mapServiceOfferingToDataSet(resource: IServiceOffering): Promise<Catalog$1>;
    private mapServiceOfferings;
    private mapResources;
    mapPtxCatalogToDcatCatalog(resources: any[]): Promise<Catalog$1>;
}

declare class DcatToPtxConvertor {
    mapDataServiceToDataResource(dataService: IDataService): DataResource;
    mapDataServiceToSoftwareResource(dataService: IDataService): SoftwareResource;
    mapDataSetToServiceOffering(dataset: IDataset): ServiceOffering;
    mapDcatCatalogToPtxCatalog(catalog: ICatalog$1): {
        serviceOfferings: IServiceOffering[];
        dataResources: IDataResource[];
        softwareResources: ISoftwareResource[];
    };
}

interface IBillingSchema {
    '@type': {
        '@id': string;
    };
    'simpl:billingSchemaDocument': string;
    'simpl:billingSchemaHashAlg': string;
    'simpl:billingSchemaHashValue': string;
    'simpl:billingSchemaURL': string;
}
interface IContractTemplate {
    '@type': {
        '@id': string;
    };
    'simpl:contractTemplateDocument': string;
    'simpl:contractTemplateHashAlg': string;
    'simpl:contractTemplateHashValue': string;
    'simpl:contractTemplateURL': string;
}
interface IDataProperties {
    '@type': {
        '@id': string;
    };
    'simpl:format': string;
    'simpl:providerDataAddress': string;
}
interface IGeneralServiceProperties {
    '@type': {
        '@id': string;
    };
    'simpl:description': string;
    'simpl:inLanguage': string;
    'simpl:name': string;
    'simpl:offeringType': string;
    'simpl:serviceAccessPoint': {
        '@type': string;
        '@value': string;
    };
}
interface IOfferingPrice {
    '@type': {
        '@id': string;
    };
    'simpl:currency': string;
    'simpl:license': {
        '@type': string;
        '@value': string;
    };
    'simpl:price': {
        '@type': string;
        '@value': number;
    };
    'simpl:priceType': string;
}
interface IProviderInformation {
    '@type': {
        '@id': string;
    };
    'simpl:contact': string;
    'simpl:providedBy': string;
    'simpl:signature': string;
}
interface IServicePolicy {
    '@type': {
        '@id': string;
    };
    'simpl:access-policy': string;
    'simpl:usage-policy': string;
}
interface ISlaAgreements {
    '@type': {
        '@id': string;
    };
    'simpl:slaAgreementsDocument': string;
    'simpl:slaAgreementsHashAlg': string;
    'simpl:slaAgreementsHashValue': string;
    'simpl:slaAgreementsURL': string;
}
interface IDataOffering {
    '@context': {
        'gax-validation': string;
        'rdf': string;
        'sh': string;
        'simpl': string;
        'skos': string;
        'xsd': string;
    };
    '@id': string;
    'rdf:type': {
        '@id': string;
    };
    'simpl:billingSchema': IBillingSchema;
    'simpl:contractTemplate': IContractTemplate;
    'simpl:dataProperties': IDataProperties;
    'simpl:generalServiceProperties': IGeneralServiceProperties;
    'simpl:offeringPrice': IOfferingPrice;
    'simpl:providerInformation': IProviderInformation;
    'simpl:servicePolicy': IServicePolicy;
    'simpl:slaAgreements': ISlaAgreements;
}
declare class BillingSchema implements IBillingSchema {
    '@type': {
        '@id': string;
    };
    'simpl:billingSchemaDocument': string;
    'simpl:billingSchemaHashAlg': string;
    'simpl:billingSchemaHashValue': string;
    'simpl:billingSchemaURL': string;
    constructor(init: IBillingSchema);
}
declare class ContractTemplate implements IContractTemplate {
    '@type': {
        '@id': string;
    };
    'simpl:contractTemplateDocument': string;
    'simpl:contractTemplateHashAlg': string;
    'simpl:contractTemplateHashValue': string;
    'simpl:contractTemplateURL': string;
    constructor(init: IContractTemplate);
}
declare class DataProperties implements IDataProperties {
    '@type': {
        '@id': string;
    };
    'simpl:format': string;
    'simpl:providerDataAddress': string;
    constructor(init: IDataProperties);
}
declare class GeneralServiceProperties implements IGeneralServiceProperties {
    '@type': {
        '@id': string;
    };
    'simpl:description': string;
    'simpl:inLanguage': string;
    'simpl:name': string;
    'simpl:offeringType': string;
    'simpl:serviceAccessPoint': {
        '@type': string;
        '@value': string;
    };
    constructor(init: IGeneralServiceProperties);
}
declare class OfferingPrice implements IOfferingPrice {
    '@type': {
        '@id': string;
    };
    'simpl:currency': string;
    'simpl:license': {
        '@type': string;
        '@value': string;
    };
    'simpl:price': {
        '@type': string;
        '@value': number;
    };
    'simpl:priceType': string;
    constructor(init: IOfferingPrice);
}
declare class ProviderInformation implements IProviderInformation {
    '@type': {
        '@id': string;
    };
    'simpl:contact': string;
    'simpl:providedBy': string;
    'simpl:signature': string;
    constructor(init: IProviderInformation);
}
declare class ServicePolicy implements IServicePolicy {
    '@type': {
        '@id': string;
    };
    'simpl:access-policy': string;
    'simpl:usage-policy': string;
    constructor(init: IServicePolicy);
}
declare class SlaAgreements implements ISlaAgreements {
    '@type': {
        '@id': string;
    };
    'simpl:slaAgreementsDocument': string;
    'simpl:slaAgreementsHashAlg': string;
    'simpl:slaAgreementsHashValue': string;
    'simpl:slaAgreementsURL': string;
    constructor(init: ISlaAgreements);
}
declare class DataOffering implements IDataOffering {
    '@context': {
        'gax-validation': string;
        'rdf': string;
        'sh': string;
        'simpl': string;
        'skos': string;
        'xsd': string;
    };
    '@id': string;
    'rdf:type': {
        '@id': string;
    };
    'simpl:billingSchema': BillingSchema;
    'simpl:contractTemplate': ContractTemplate;
    'simpl:dataProperties': DataProperties;
    'simpl:generalServiceProperties': GeneralServiceProperties;
    'simpl:offeringPrice': OfferingPrice;
    'simpl:providerInformation': ProviderInformation;
    'simpl:servicePolicy': ServicePolicy;
    'simpl:slaAgreements': SlaAgreements;
    constructor(init: IDataOffering);
    toJSON(): string;
}

declare class PtxToSimplConvertor {
    mapDataOfferingToDataResource(dataResource: DataResource): DataOffering;
}

declare class SimplToPtxConvertor {
    mapDataOfferingToDataResource(dataOffering: IDataOffering): DataResource;
}

declare enum CatalogEnum {
    SERVICE_OFFERING = "serviceofferings",
    DATA_RESOURCE = "dataresources",
    SOFTWARE_RESOURCE = "softwareresources"
}

interface ICatalog {
    endpoint: string;
    resourceId: string;
    type: CatalogEnum;
    enabled: boolean;
}
declare class Catalog implements ICatalog {
    endpoint: string;
    resourceId: string;
    type: CatalogEnum;
    enabled: boolean;
    constructor(init: ICatalog);
    toJSON(): ICatalog;
}

interface IDataProductUsageContract {
    'gx:providedBy': string;
    'gx:consumedBy': string;
    'gx:dataProduct': string;
    'gx:signers': ISignatureCheckType[];
    'gx:termOfUsage': string;
    'gx:notarizedIn'?: string;
    'gx:dataUsage': string;
}
declare class DataProductUsageContract implements IDataProductUsageContract {
    'gx:providedBy': string;
    'gx:consumedBy': string;
    'gx:dataProduct': string;
    'gx:signers': SignatureCheckType[];
    'gx:termOfUsage': string;
    'gx:notarizedIn'?: string;
    'gx:dataUsage': string;
    constructor(init: IDataProductUsageContract);
    toJSON(): IDataProductUsageContract;
}

interface IDataTransaction {
    'gx:dataProductUsageContract': IDataProductUsageContract;
    'gx:dataUsage': IDataUsage;
}
declare class DataTransaction implements IDataTransaction {
    'gx:dataProductUsageContract': DataProductUsageContract;
    'gx:dataUsage': DataUsage;
    constructor(init: IDataTransaction);
    toJSON(): IDataTransaction;
}

interface ICatalogRecord {
    'dcterms:title': string;
    'dcterms:description': string;
    'dcterms:issued': string;
    'dcterms:modified': string;
    'foaf:primaryTopic': unknown;
    'dcterms:conformsTo': dcterms.Standard;
}

interface IChecksum {
    'spdx:algorithm': unknown;
    'spdx:checksumValue': unknown;
}
declare class Checksum implements IChecksum {
    'spdx:algorithm': unknown;
    'spdx:checksumValue': unknown;
}

interface IPeriodOfTime {
    'dcat:startDate': string;
    'dcat:endDate': string;
    'time:hasBeginning': string;
    'time:hasEnd': string;
}

interface IRole {
    'dcat:role': string;
}

export { Catalog, Checksum, ContractTemplate, Distribution$1 as DSPDistribution, DataCatalog, DataOffering, DataProduct, DataProductUsageContract, DataRepresentation, DataResource, DataSet, DataTransaction, DcatToPtxConvertor, Distribution, GaiaXToPtxConvertor, type IBillingSchema, type ICatalog, type ICatalogRecord, type IChecksum, type IContractTemplate, type IDataOffering, type IDataProductUsageContract, type IDataRepresentation, type IDataResource, type IDataSet, type IDataTransaction, type IDistribution$1 as IDistribution, type IOfferingPrice, type IPeriodOfTime, type IResource, type IRole, type IServiceOffering, type ISoftwareResource, PtxToDcatConvertor, PtxToGaiaXConvertor, PtxToSimplConvertor, Resource, ServiceOffering, SimplToPtxConvertor, SoftwareResource, type Standard };
