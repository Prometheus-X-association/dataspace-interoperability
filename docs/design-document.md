# Dataspace Interoperability

The goal of Dataspace Interoperability is to enable interactions between different dataspaces, allowing them to share data, services, and functionality. This document focuses on the first milestone of this effort, which is to interface with SIMPL and their open source work.

## Introduction

EOSC is deploying a SIMPL agent to interface with other dataspaces. As part of the Prometheus-X dataspace, we aim to explore this interoperability and start working on cross-dataspace subjects, beginning with SIMPL. The Skills & Education dataspace, where Prometheus-X operates, can benefit from this interoperability, enabling use cases such as recommending teachers or classes, matching them with relevant scientific articles, or finding related content.

## Technical Approach

SIMPL has already developed a MVP of a catalogue. Our first exploration will be to investigate how to make the Prometheus-X catalogue communicate with the SIMPL catalogue. The primary use case for this interoperability effort is to display catalogue offers from SIMPL inside Prometheus-X.

## IDS Dataspace Protocol (IDS DSP) and Eclipse Dataspace Connector (EDC)

SIMPL is built on top of the IDS Dataspace Protocol (IDS DSP) using an Eclipse Dataspace Connector (EDC). Prometheus-X has added support for the DSP within the Prometheus-X Dataspace Connector (PDC), hence the initial approach will be to look into communication between the two connectors leveraging the DSP.

## Goals and Milestones

The primary goal of this design document is to emphasize the first target milestone, which is to handle displaying SIMPL catalog offers inside Prometheus-X using EOSC as a test bed for this use case. To achieve this, we will develop a middleware that enables the conversion of catalogue offers from SIMPL's DSP-based catalogue to the Prometheus-X catalogue format.

The middleware will rely on the DSP's Catalog Protocol, which is based on the DCAT (Data Catalog Vocabulary) model. The middleware will process incoming catalogue messages from SIMPL, such as `cat:CatalogQueryMessage` and `cat:CatalogResponseMessage`, and transform them into a format compatible with the Prometheus-X catalogue.

The transformation process will involve mapping the DCAT model used by SIMPL to the Prometheus-X catalogue model, ensuring that the essential metadata, such as title, description, and keywords, are preserved. The middleware will also handle any necessary data validation and normalization to ensure seamless integration with the Prometheus-X catalogue.

### Features/main functionalities

- Allowing interaction between SIMPL Catalogue & Prometheus-X Catalogue
- Enabling of DSP-based SIMPL Catalog Offers in the Prometheus-X Catalogue.
- Exploration of communication using the IDS Dataspace Protocol

### Technical usage scenarios

- Processing of DCAT SIMPL Catalogue Offers for interpretation in Prometheus-X Catalogues
- Parsing of Prometheus-X Catalogue Offers into DCAT for interpretation from SIMPL Catalogues

## Requirements

| Requirement ID | Short Description | BB Input Format | BB Output Format | Requirement Type |
| --- | --- | --- | --- | --- |
| BB-REQ_ID__1 | Must be able to process DSP-based DCAT Offers | DCAT Datasets | REST API response | Functional (FUN) |
| BB-REQ_ID__2 | Must allow the transformation of DSP-based DCAT Offers into processable PTX Catalogue Offers | REST API call | REST API response | Functional (FUN) |

## Integrations

### Direct Integrations with other BBs

The work done in this building block will ensure communication with
* Prometheus-X Catalog-API BB
* Prometheus-X Contract-Manager BB for ODRL policies

### Itegrations via the Prometheus-X Dataspace Connector

The PDC will probably come into play regarding the communication through the DSP with connectors used in SIMPL.

## Current Limitations

Due to the rapidly evolving nature of the dataspaces and the various initiatives involved, it is not possible to define every detail at 100% accuracy at this time. The landscape is subject to change, and our approach will need to adapt to the developments in the EOSC, SIMPL, and other related initiatives.

## Next Steps

The next steps will involve:

1. Investigating the SIMPL catalogue and its API.
2. Identifying DCAT models used by SIMPL and defining a mapping middleware towards PTX catalogue schemas.
3. Developing a proof-of-concept to display SIMPL catalog offers inside Prometheus-X.
4. Testing and refining the integration using EOSC as a test bed.

## Relevant Standards and Protocols

* IDS Dataspace Protocol
* DCAT
* JSON-LD

## Input/Output Data

The input data for this interoperability effort will include catalogue offers from SIMPL, which will be processed and displayed within Prometheus-X. The input data will consist of DSP messages, such as `cat:CatalogQueryMessage` and `cat:CatalogResponseMessage`, which contain catalogue offers in the DCAT (Data Catalog Vocabulary) model.

For example, a `cat:CatalogResponseMessage` might contain a catalogue offer like this:

```json
{
  "@type": "cat:CatalogResponseMessage",
  "@id": "https://example.com/catalog-response",
  "payload": [
    {
      "@type": "dcat:Dataset",
      "@id": "https://example.com/dataset-1",
      "dct:title": "Example Dataset 1",
      "dct:description": "This is an example dataset.",
      "dcat:keyword": ["example", "dataset"],
      "dcat:distribution": [
        {
          "@type": "dcat:Distribution",
          "@id": "https://example.com/distribution-1",
          "dct:title": "Example Distribution 1",
          "dct:description": "This is an example distribution.",
          "dcat:accessURL": "https://example.com/access-url-1"
        }
      ]
    },
    {
      "@type": "dcat:Dataset",
      "@id": "https://example.com/dataset-2",
      "dct:title": "Example Dataset 2",
      "dct:description": "This is another example dataset.",
      "dcat:keyword": ["example", "dataset"],
      "dcat:distribution": [
        {
          "@type": "dcat:Distribution",
          "@id": "https://example.com/distribution-2",
          "dct:title": "Example Distribution 2",
          "dct:description": "This is another example distribution.",
          "dcat:accessURL": "https://example.com/access-url-2"
        }
      ]
    }
  ]
}
```

This example shows a catalogue response message containing two catalogue offers, each with a title, description, keywords, and a distribution with an access URL.

The output data will consist of the integrated catalogue offers.

## Architecture

The architecture for this interoperability effort is illustrated below:

```mermaid
graph LR
    subgraph EOSC Testbed
        SIMPL[SIMPL Catalog]
        EDC1[SIMPL EDC Connector 1]
        EDC2[SIMPL EDC Connector 2]
        EDC1 --> SIMPL
        EDC2 --> SIMPL
    end
    subgraph Prometheus-X
        Middleware[Middleware]
        CatalogAPI[Catalog API Service]
    end
    EDC1 -->|DSP Messages| Middleware
    EDC2 -->|DSP Messages| Middleware
    SIMPL -->|DSP Messages| Middleware
    Middleware -->|PTX Offers| CatalogAPI
```

This diagram shows the EOSC testbed with a SIMPL catalog and multiple SIMPL EDC connectors, which communicate with the Prometheus-X dataspace through the newly developed middleware. The middleware transforms the DSP messages from the SIMPL EDC connectors into a format compatible with the Prometheus-X Catalog API service.
