# Interop Library

A TypeScript library for handling interoperability between different data and service catalogs, with a focus on Gaia-X, PTX, DCAT, and SIMPL standards.

## Overview

This library provides TypeScript interfaces and classes for working with various data and service catalog formats, including:

- Gaia-X Data Products and Services
- PTX Resources and Services
- DCAT Data Services and Datasets
- SIMPL Data Offerings

## Features

- Type-safe interfaces for data structures
- Consistent serialization/deserialization
- Support for multiple catalog formats
- Built-in validation and type checking
- Comprehensive documentation
- Format conversion utilities:
  - PTX ↔ DCAT
  - PTX ↔ Gaia-X
  - PTX ↔ SIMPL

## Structure

The library is organized into several main sections:

### Converters (`src/convertor/`)

Contains bidirectional converters between different formats:

- `DcatToPtxConvertor`: Converts DCAT to PTX format
- `GaiaXToPtxConvertor`: Converts Gaia-X to PTX format
- `PtxToDcatConvertor`: Converts PTX to DCAT format
- `PtxToGaiaXConvertor`: Converts PTX to Gaia-X format
- `PtxToSimplConvertor`: Converts PTX to SIMPL format
- `SimplToPtx`: Converts SIMPL to PTX format

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

## Usage

### Installation

```bash
npm install interop-library
```

### Format Conversion Examples

#### Converting PTX to Gaia-X

```typescript
import { PtxToGaiaXConvertor } from 'interop-library/convertor/PtxToGaiaX.convertor';
import { IServiceOffering } from 'interop-library/types/ptx/ServiceOffering';

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
import { DcatToPtxConvertor } from 'interop-library/convertor/DcatToPtx.convertor';
import { IDataService } from 'interop-library/types/dsp/DataService';

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
import { PtxToSimplConvertor } from 'interop-library/convertor/PtxToSimpl.convertor';
import { IDataResource } from 'interop-library/types/ptx/DataResource';

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

## Type Definitions

All interfaces and classes are fully typed with TypeScript, providing:

- Property type checking
- Optional property handling
- Proper serialization/deserialization
- Documentation for all properties and methods

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
