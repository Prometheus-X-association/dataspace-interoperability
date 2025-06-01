export interface IBillingSchema {
  '@type': { '@id': string };
  'simpl:billingSchemaDocument': string;
  'simpl:billingSchemaHashAlg': string;
  'simpl:billingSchemaHashValue': string;
  'simpl:billingSchemaURL': string;
}

export interface IContractTemplate {
  '@type': { '@id': string };
  'simpl:contractTemplateDocument': string;
  'simpl:contractTemplateHashAlg': string;
  'simpl:contractTemplateHashValue': string;
  'simpl:contractTemplateURL': string;
}

export interface IDataProperties {
  '@type': { '@id': string };
  'simpl:format': string;
  'simpl:providerDataAddress': string;
}

export interface IGeneralServiceProperties {
  '@type': { '@id': string };
  'simpl:description': string;
  'simpl:inLanguage': string;
  'simpl:name': string;
  'simpl:offeringType': string;
  'simpl:serviceAccessPoint': {
    '@type': string;
    '@value': string;
  };
}

export interface IOfferingPrice {
  '@type': { '@id': string };
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

export interface IProviderInformation {
  '@type': { '@id': string };
  'simpl:contact': string;
  'simpl:providedBy': string;
  'simpl:signature': string;
}

export interface IServicePolicy {
  '@type': { '@id': string };
  'simpl:access-policy': string;
  'simpl:usage-policy': string;
}

export interface ISlaAgreements {
  '@type': { '@id': string };
  'simpl:slaAgreementsDocument': string;
  'simpl:slaAgreementsHashAlg': string;
  'simpl:slaAgreementsHashValue': string;
  'simpl:slaAgreementsURL': string;
}

export interface IDataOffering {
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

export class BillingSchema implements IBillingSchema {
  '@type': { '@id': string };
  'simpl:billingSchemaDocument': string;
  'simpl:billingSchemaHashAlg': string;
  'simpl:billingSchemaHashValue': string;
  'simpl:billingSchemaURL': string;

  constructor(init: IBillingSchema) {
    Object.assign(this, init);
  }
}

export class ContractTemplate implements IContractTemplate {
  '@type': { '@id': string };
  'simpl:contractTemplateDocument': string;
  'simpl:contractTemplateHashAlg': string;
  'simpl:contractTemplateHashValue': string;
  'simpl:contractTemplateURL': string;

  constructor(init: IContractTemplate) {
    Object.assign(this, init);
  }
}

export class DataProperties implements IDataProperties {
  '@type': { '@id': string };
  'simpl:format': string;
  'simpl:providerDataAddress': string;

  constructor(init: IDataProperties) {
    Object.assign(this, init);
  }
}

export class GeneralServiceProperties implements IGeneralServiceProperties {
  '@type': { '@id': string };
  'simpl:description': string;
  'simpl:inLanguage': string;
  'simpl:name': string;
  'simpl:offeringType': string;
  'simpl:serviceAccessPoint': {
    '@type': string;
    '@value': string;
  };

  constructor(init: IGeneralServiceProperties) {
    Object.assign(this, init);
  }
}

export class OfferingPrice implements IOfferingPrice {
  '@type': { '@id': string };
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

  constructor(init: IOfferingPrice) {
    Object.assign(this, init);
  }
}

export class ProviderInformation implements IProviderInformation {
  '@type': { '@id': string };
  'simpl:contact': string;
  'simpl:providedBy': string;
  'simpl:signature': string;

  constructor(init: IProviderInformation) {
    Object.assign(this, init);
  }
}

export class ServicePolicy implements IServicePolicy {
  '@type': { '@id': string };
  'simpl:access-policy': string;
  'simpl:usage-policy': string;

  constructor(init: IServicePolicy) {
    Object.assign(this, init);
  }
}

export class SlaAgreements implements ISlaAgreements {
  '@type': { '@id': string };
  'simpl:slaAgreementsDocument': string;
  'simpl:slaAgreementsHashAlg': string;
  'simpl:slaAgreementsHashValue': string;
  'simpl:slaAgreementsURL': string;

  constructor(init: ISlaAgreements) {
    Object.assign(this, init);
  }
}

export class DataOffering implements IDataOffering {
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

  constructor(init: IDataOffering) {
    Object.assign(this, init);
  }

  public toJSON(): string {
    return JSON.stringify(this, null, 2);
  }
} 