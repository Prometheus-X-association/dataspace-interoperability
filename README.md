# Dataspace interoperability

A TypeScript library for handling interoperability between different catalog, with a focus on Gaia-X, Prometheus-X, DCAT, and SIMPL.

## Prerequisites

- npm: minimum 9.6.7
- pnpm: minimum 10.3.0
- node.js: minimum 18.17.0

## Overview

This library provides TypeScript interfaces and classes for working with various dataspace catalog formats, including:

- Gaia-X
- Prometheus-X
- Data Space Protocol DCAT
- SIMPL
- EDC

## Features

- Type-safe interfaces for data structures
- Consistent serialization/deserialization
- Format conversion utilities:
  - PTX ↔ DCAT
  - PTX ↔ Gaia-X
  - PTX ↔ SIMPL
  - PTX ↔ EDC

## Structure

The library is organized into several main sections:

### Converters (`src/convertors/`)

Contains bidirectional converters between different formats:

- `PtxToDcatConvertor`: Converts PTX to DCAT format
- `PtxToGaiaXConvertor`: Converts PTX to Gaia-X format
- `PtxToSimplConvertor`: Converts PTX to SIMPL format
- `PtxToEDCConvertor`: Converts PTX to EDC format
- `DcatToPtxConvertor`: Converts DCAT to PTX format
- `GaiaXToPtxConvertor`: Converts Gaia-X to PTX format
- `SimplToPtxConvertor`: Converts SIMPL to PTX format
- `EDCToPtxConvertor`: Converts EDC to PTX format

### PTX Types (`src/types/ptx/`)

Contains interfaces and classes for PTX (Provider Transaction) related structures:

- `DataResource`: Represents data resources
- `ServiceOffering`: Defines service offerings
- `SoftwareResource`: Represents software resources
- `DataRepresentation`: Handles data representation formats
- `Catalog`: Represents a catalog endpoint

### Gaia-X Types (`src/types/gaia-x/`)

Contains interfaces and classes for Gaia-X related structures:

- `DataCatalog`: Represents a Gaia-X Data Catalog
- `DataProduct`: Defines data product structures
- `DataSet`: Represents data sets
- `Distribution`: Manages data distribution information
- `DataProductUsageContract`: Manages data product usage contracts
- `DataTransaction`: Handles data transactions
- `LegalPerson`: Represents legal entity information
- `vcard`: Contains vCard related functionality

### DSP Types (`src/types/dsp/`)

Contains interfaces and classes for DCAT related structures:

- `Catalog`: Represents a DCAT catalog
- `DataService`: Defines data service structures
- `Dataset`: Represents datasets
- `Distribution`: Handles distribution information
- `foaf`: Contains FOAF related functionality
- `skos`: Contains SKOS related functionality
- `vcard`: Contains vCard related functionality

### SIMPL Types (`src/types/simpl/`)

Contains interfaces and classes for SIMPL related structures:

- `DataOffering`: Represents data offerings
- `BillingSchema`: Defines billing schema structures
- `ContractTemplate`: Handles contract templates
- `OfferingPrice`: Manages offering price information

### EDC Types (`src/types/edc/`)

Contains interfaces and classes for SIMPL related structures:

- `EdcCatalog`: Represents an EDC Catalog
- `EdcDataService`: Represents datasService
- `EdcDataset`: Represents datasets
- `EdcDistribution`: Represents distribution

## Mappings

### PTX ↔ DCAT Mapping

| PTX Type                                              | DCAT Type                                     |
|-------------------------------------------------------|-----------------------------------------------|
| [DataResource](src/types/ptx/DataResource.ts)         | [DataService](src/types/dsp/DataService.ts)   |
| [SoftwareResource](src/types/ptx/SoftwareResource.ts) | [DataService](src/types/dsp/DataService.ts)   |
| [ServiceOffering](src/types/ptx/ServiceOffering.ts)   | [DataSet](src/types/dsp/Dataset.ts)           |
| [Catalog](src/types/ptx/Catalog.ts)                   | [Catalog](src/types/dsp/Catalog.ts)           |
| [Representation](src/types/ptx/Representation.ts)     | [Distribution](src/types/dsp/Distribution.ts) |

### PTX ↔ EDC Mapping

| PTX Type                                              | EDC Type                                         |
|-------------------------------------------------------|--------------------------------------------------|
| [DataResource](src/types/ptx/DataResource.ts)         | [DataSet](src/types/edc/EdcDataset.ts)           |
| [SoftwareResource](src/types/ptx/SoftwareResource.ts) | [DataSet](src/types/edc/EdcDataset.ts)           |
| [ServiceOffering](src/types/ptx/ServiceOffering.ts)   | [DataService](src/types/edc/EdcDataService.ts)   |
| [Catalog](src/types/ptx/Catalog.ts)                   | [Catalog](src/types/edc/EdcCatalog.ts)           |
| [Representation](src/types/ptx/Representation.ts)     | [Distribution](src/types/edc/EdcDistribution.ts) |

### PTX ↔ Gaia-X Mapping

| PTX Type                                              | Gaia-X Type                                      |
|-------------------------------------------------------|--------------------------------------------------|
| [DataResource](src/types/ptx/DataResource.ts)         | [DataSet](src/types/gaia-x/DataSet.ts)           |
| [SoftwareResource](src/types/ptx/SoftwareResource.ts) | [DataSet](src/types/gaia-x/DataSet.ts)           |
| [ServiceOffering](src/types/ptx/ServiceOffering.ts)   | [DataProduct](src/types/gaia-x/DataProduct.ts)   |
| [Catalog](src/types/ptx/Catalog.ts)                   | [DataCatalog](src/types/gaia-x/DataCatalog.ts)   |
| [Representation](src/types/ptx/Representation.ts)     | [Distribution](src/types/gaia-x/Distribution.ts) |

### PTX ↔ SIMPL Mapping

| PTX Type                                              | SIMPL Type                                      |
|-------------------------------------------------------|-------------------------------------------------|
| [DataResource](src/types/ptx/DataResource.ts)         | To define                                       |
| [SoftwareResource](src/types/ptx/SoftwareResource.ts) | To define                                       |
| [ServiceOffering](src/types/ptx/ServiceOffering.ts)   | [DataOffering](src/types/simpl/DataOffering.ts) |
| [Representation](src/types/ptx/Representation.ts)     | To define                                       |

## Usage

### Installation

```bash
pnpm i github:Prometheus-X-association/dataspace-interoperability#1.0.0-beta.2
```

### Format Conversion Examples

#### Converting PTX to Gaia-X

```typescript
import { PtxToGaiaXConvertor } from 'dataspace-interoperability/convertors/PtxToGaiaX.convertor';
import { IServiceOffering } from 'dataspace-interoperability/types/ptx/ServiceOffering';

// Create a converter instance
const converter = new PtxToGaiaXConvertor();

// Example: Converting a service offering to Gaia-X format
async function convertToGaiaX(serviceOffering: IServiceOffering) {
  try {
    // Convert the service offering to Gaia-X format
    const gaiaXProduct = await converter.mapServiceOfferingToDataProduct(serviceOffering);
    return gaiaXProduct;
  } catch (error) {
    console.error('Error converting to Gaia-X:', error);
    throw error;
  }
}
```

#### Converting DCAT to PTX

```typescript
import { DcatToPtxConvertor } from 'dataspace-interoperability/convertors/DcatToPtx.convertor';
import { IDataService } from 'dataspace-interoperability/types/dsp/DataService';

// Create a converter instance
const converter = new DcatToPtxConvertor();

// Example: Converting a DCAT data service to PTX format
function convertDcatToPtx(dataService: IDataService) {
  try {
    // Convert the data service to PTX format
    const ptxResource = converter.mapDataServiceToDataResource(dataService);
    return ptxResource;
  } catch (error) {
    console.error('Error converting DCAT to PTX:', error);
    throw error;
  }
}
```

#### Converting PTX to SIMPL

```typescript
import { PtxToSimplConvertor } from 'dataspace-interoperability/convertors/PtxToSimpl.convertor';
import { IDataResource } from 'dataspace-interoperability/types/ptx/DataResource';

// Create a converter instance
const converter = new PtxToSimplConvertor();

// Example: Converting a PTX data resource to SIMPL format
function convertPtxToSimpl(dataResource: IDataResource) {
  try {
    // Convert the data resource to SIMPL format
    const simplOffering = converter.mapDataOfferingToDataResource(dataResource);
    return simplOffering;
  } catch (error) {
    console.error('Error converting PTX to SIMPL:', error);
    throw error;
  }
}
```

## Tests

The library includes comprehensive test coverage for all converters and their functionality. Tests are written using Chai and Mocha.

### Test Coverage

The test suite covers the following converters and their functionality:

#### PTX ↔ DCAT Converter Tests
- DataResource to DataService conversion
- SoftwareResource to DataService conversion
- ServiceOffering to DataSet conversion
- Full PTX Catalog to DCAT Catalog conversion
- DataService to DataResource conversion
- DataService to SoftwareResource conversion
- DataSet to ServiceOffering conversion
- DCAT Catalog to PTX Catalog conversion

#### PTX ↔ Gaia-X Converter Tests
- DataResource to DataSet conversion
- SoftwareResource to DataSet conversion
- ServiceOffering to DataProduct conversion
- Full PTX Catalog to Gaia-X Catalog conversion
- DataSet to DataResource conversion
- DataSet to SoftwareResource conversion
- DataProduct to ServiceOffering conversion
- Gaia-X Catalog to PTX Catalog conversion

#### PTX ↔ SIMPL Converter Tests
- DataOffering to DataResource conversion
- DataResource to DataOffering conversion

#### PTX ↔ EDC Converter Tests
- EDC Catalog to PTX Catalog conversion
- PTX Catalog to EDC Catalog conversion

### Running Tests

To run the test suite:

```bash
git clone https://github.com/Prometheus-X-association/dataspace-interoperability.git
```

```bash
cd dataspace-interoperability
```

```bash
npm install
```

```bash
npm run test
```

Expected output:
```
    DCAT Catalog to Prometheus-X Catalog
    ✔ should map a dataService to a dataResource
    ✔ should map a dataServices to a softwareResource
    ✔ should map a dataSet to a serviceOffering
    ✔ should map a DCAT Catalog to a Prometheus-X Catalog

  EDC Catalog to Prometheus-X Catalog
    ✔ should map an EDC Catalog to a Prometheus-X Catalog

  Gaia-X Catalog to Prometheus-X Catalog
    ✔ should map a dataSet to a dataResource
    ✔ should map a dataSet to a softwareResource
    ✔ should map a dataProduct to a serviceOffering
    ✔ should map a Gaia-X Catalog to a Prometheus-X Catalog

  Prometheus-X Catalog to DCAT catalog
    ✔ should map a dataResource to a dataService
    ✔ should map a softwareResource to a dataServices
    ✔ should map a serviceOffering to a dataSet
    ✔ should map a Prometheus-X Catalog to a DCAT Catalog

  Prometheus-X Catalog to EDC Catalog
    ✔ should map a Prometheus-X Catalog to an EDC Catalog (46ms)

  Prometheus-X Catalog to Gaia-X catalog
    ✔ should map a dataResource to a dataService
    ✔ should map a softwareResource to a dataServices
    ✔ should map a serviceOffering to a dataSet
    ✔ should map a Prometheus-X Catalog to a DCAT Catalog

  Prometheus-X Catalog to Simpl Catalog
    ✔ should map a DataResource to a DataOffering

  Simpl Catalog to Prometheus-X Catalog
    ✔ should map a DataOffering to a DataResource


  20 passing (Xms)
```
## Local usage


```bash
git clone https://github.com/Prometheus-X-association/dataspace-interoperability.git
```

```bash
cd dataspace-interoperability
```

```bash
npm install
```

```bash
npm run build
```

In the project where you want to add the library, add this line to the dependencies section of your package.json.

```yaml
'dataspace-interoperability': 'path/to/dataspace-interoperability/dist'
```

```bash
npm install
```

Or you can use npm link in the dataspace-interoperability project

```bash
npm link
```

In the project where you want to add the library

```bash
npm link dataspace-interoperability
```

### Build

To build use

```bash
npm run build
```

### Docs

To generate a doc use

```bash
npm run doc
```

This command will generate documentation using type in the _html-doc_ directory

## Type Definitions

All interfaces and classes are fully typed with TypeScript, providing:

- Property type checking
- Optional property handling
- Proper serialization/deserialization
- Documentation for all properties and methods

## EDC additional information

To realize the EDC mapping the [MinimalViableDataspace](https://github.com/eclipse-edc/MinimumViableDataspace) has been deployed locally for test and development purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

Design document can be found [here](./docs/design-document.md).
