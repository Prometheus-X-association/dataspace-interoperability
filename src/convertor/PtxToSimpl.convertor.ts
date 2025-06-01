import { DataOffering, IDataOffering } from '../types/simpl/DataOffering';
import { DataResource } from '../types/ptx/DataResource';

export class PtxToSimplConvertor {
  public mapDataOfferingToDataResource(dataResource: DataResource): IDataOffering {
    if (!dataResource._id) {
      throw new Error('DataResource must have an _id property');
    }

    type PolicyType = { 
      policy: {
          permission: { 
        action: string; 
        constraint: any[] 
      }[] 
      }
    };

    const usagePolicy = dataResource.policy
      .filter((policy: PolicyType) => 
        policy.policy.permission.some((permission) => permission.action === 'use')
      );

    const accessPolicy = dataResource.policy
      .filter((policy: PolicyType) => 
        policy.policy.permission.some((permission) => permission.action === 'access')
      );

    return new DataOffering({
      '@context': {
        'gax-validation': 'https://w3id.org/gaia-x/validation#',
        'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        'sh': 'http://www.w3.org/ns/shacl#',
        'simpl': 'https://w3id.org/simpl#',
        'skos': 'http://www.w3.org/2004/02/skos/core#',
        'xsd': 'http://www.w3.org/2001/XMLSchema#'
      },
      '@id': dataResource._id,
      'rdf:type': {
        '@id': 'simpl:DataOffering'
      },
      'simpl:billingSchema': {
        '@type': { '@id': 'simpl:BillingSchema' },
        'simpl:billingSchemaDocument': '',
        'simpl:billingSchemaHashAlg': '',
        'simpl:billingSchemaHashValue': '',
        'simpl:billingSchemaURL': ''
      },
      'simpl:contractTemplate': {
        '@type': { '@id': 'simpl:ContractTemplate' },
        'simpl:contractTemplateDocument': '',
        'simpl:contractTemplateHashAlg': '',
        'simpl:contractTemplateHashValue': '',
        'simpl:contractTemplateURL': ''
      },
      'simpl:dataProperties': {
        '@type': { '@id': 'simpl:DataProperties' },
        'simpl:format': '',
        'simpl:providerDataAddress': ''
      },
      'simpl:generalServiceProperties': {
        '@type': { '@id': 'simpl:GeneralServiceProperties' },
        'simpl:description': dataResource.description || '',
        'simpl:inLanguage': 'en',
        'simpl:name': dataResource.name || '',
        'simpl:offeringType': 'DataOffering',
        'simpl:serviceAccessPoint': {
          '@type': 'xsd:anyURI',
          '@value': dataResource.exposedThrough || ''
        }
      },
      'simpl:offeringPrice': {
        '@type': { '@id': 'simpl:OfferingPrice' },
        'simpl:currency': 'EUR',
        'simpl:license': {
          '@type': 'xsd:anyURI',
          '@value': dataResource.license?.[0] || ''
        },
        'simpl:price': {
          '@type': 'xsd:decimal',
          '@value': 0
        },
        'simpl:priceType': 'Free'
      },
      'simpl:providerInformation': {
        '@type': { '@id': 'simpl:ProviderInformation' },
        'simpl:contact': '',
        'simpl:providedBy': dataResource.producedBy || '',
        'simpl:signature': ''
      },
      'simpl:servicePolicy': {
        '@type': { '@id': 'simpl:ServicePolicy' },
        'simpl:access-policy': JSON.stringify(accessPolicy) || '',
        'simpl:usage-policy': JSON.stringify(usagePolicy) || ''
      },
      'simpl:slaAgreements': {
        '@type': { '@id': 'simpl:SlaAgreements' },
        'simpl:slaAgreementsDocument': '',
        'simpl:slaAgreementsHashAlg': '',
        'simpl:slaAgreementsHashValue': '',
        'simpl:slaAgreementsURL': ''
      }
    });
  }
} 