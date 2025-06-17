import nock from 'nock';
import dataResource from './ptx/dataResource.json'

export const mockParticipant = () => {
    nock('https://catalog.ptx')
        .persist()
        .get('/v1/catalog/participants/66d18724ee71f9f096bae810')
        .reply(200, {
                '@context': 'http://host.docker.internal:4040/v1/participant',
                '@type': 'Participant',
                _id: '66d18724ee71f9f096bae810',
                did: 'did:web:66d18724ee71f9f096bae810:provider',
                legalName: 'Test-DataProvider',
                legalPerson: {
                    registrationNumber: '',
                    headquartersAddress: { countryCode: '' },
                    legalAddress: { countryCode: '' },
                    parentOrganization: [],
                    subOrganization: []
                },
                termsAndConditions: '',
                associatedOrganisation: '66d18724ee71f9f096bae80f',
                schema_version: '1',
                dataspaceConnectorAppKey: '189a0d1e69550eeba9d3161b5fd91b519a8ab4c93403ec4ca3f8bb3f2c11db9069bf8868a85e0ec695e9b699c8de9823fe0d47e4f2b55a41fb2f00ffb8fcf21d',
                dataspaceEndpoint: 'http://host.docker.internal:3333/',
                logo: '',
                createdAt: '2024-08-30T08:47:32.824Z',
                updatedAt: '2025-04-17T08:32:57.232Z',
                __v: 0
            }
        );
}

export const mockDataResource = () => {
    // Mocking ecosystem contract
    nock('https://catalog.ptx')
        .persist()
        .get('/v1/catalog/dataresources/66d1889cee71f9f096bae98b')
        .reply(200, dataResource);
    // Mocking ecosystem contract
    nock('http://catalog.test')
        .persist()
        .get('/v1/catalog/dataresources/65e71e4174f9e9026bd5dc41')
        .reply(200, {
            '@context': 'http://catalog.test/v1/dataresource',
            '@type': 'DataResource',
            _id: '65e71e4174f9e9026bd5dc41',
            aggregationOf: [],
            name: 'PROVIDER PAYLOAD TEST',
            description: 'desc',
            copyrightOwnedBy: [
                'http://catalog.test/v1/catalog/participants/6564abb5d853e8e05b132057',
            ],
            license: [],
            policy: [
                {
                    '@context': {
                        xsd: 'http://www.w3.org/2001/XMLSchema#',
                        description: {
                            '@id': 'https://schema.org/description',
                            '@container': '@language',
                        },
                    },
                    '@id': 'http://catalog.test/static/references/rules/rule-access-1.json',
                    title: {
                        '@type': 'xsd/string',
                        '@value': 'No Restriction',
                    },
                    uid: 'rule-access-1',
                    name: 'No Restriction',
                    description: [
                        {
                            '@value': 'CAN use data without any restrictions',
                            '@language': 'en',
                        },
                    ],
                    policy: {
                        permission: [
                            {
                                action: 'use',
                                target: '@{target}',
                                constraint: [],
                            },
                        ],
                    },
                    requestedFields: ['target'],
                },
            ],
            producedBy: '6564abb5d853e8e05b132057',
            exposedThrough: [],
            obsoleteDateTime: '',
            expirationDateTime: '',
            containsPII: false,
            anonymized_extract: '',
            archived: false,
            attributes: [],
            category: '648353e51d2c11adaae558c1',
            isPayloadForAPI: true,
            country_or_region: 'World',
            entries: -1,
            subCategories: [],
            schema_version: '1',
            createdAt: '2024-03-05T13:29:37.061Z',
            updatedAt: '2024-03-27T14:08:19.986Z',
            __v: 0,
            representation: {
                _id: '65e71e4174f9e9026bd5dc48',
                resourceID: '65e71e4174f9e9026bd5dc41',
                fileType: '',
                type: 'REST',
                url: 'http://catalog.test:3331/api/users/{userId}',
                sqlQuery: '',
                className: '',
                method: 'none',
                credential: '',
                createdAt: '2024-03-05T13:29:37.122Z',
                updatedAt: '2024-06-25T07:48:59.077Z',
                __v: 0,
            },
            apiResponseRepresentation: {
                _id: '65e71e4174f9e9026bd5dc4d',
                resourceID: '65e71e4174f9e9026bd5dc41',
                fileType: '',
                type: 'REST',
                url: 'http://catalog.test:3331/api/users/{userId}',
                sqlQuery: '',
                className: '',
                method: 'none',
                credential: '',
                createdAt: '2024-03-05T13:29:37.141Z',
                updatedAt: '2024-06-25T07:48:59.073Z',
                __v: 0,
            },
        });
};
export const setUpDspCatalogErrorNockMocks = () => {
    // Mocking ecosystem contract
    nock('http://catalog.test')
        .persist()
        .get('/v1/catalog/serviceofferings/660432088020cd0ef5427e2c')
        .reply(200, {
            error: 'internal-server-error',
            statusCode: 500,
            message: 'Unknown Error',
        });
};
