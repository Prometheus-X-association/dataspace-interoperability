import { expect } from 'chai';
import { GaiaXToPtxConvertor } from '../convertors/GaiaXToPtx.convertor';
import gaiaxDataSet from './utils/gaiax/gaiaxDataSet.json';
import gaiaxDataSet2 from './utils/gaiax/gaiaxDataSet2.json';
import dataProduct from './utils/gaiax/dataProduct.json';
import gaiaxDataCatalog from './utils/gaiax/gaiaxDataCatalog.json';
import { IDataSet } from '../types/gaia-x/DataSet';
import { DataProduct } from '../types/gaia-x/DataProduct';
import { DataCatalog } from '../types/gaia-x/DataCatalog';

describe('Gaia-X Catalog to Prometheus-X Catalog', function () {
  let convertor: GaiaXToPtxConvertor;

  beforeEach(function () {
    convertor = new GaiaXToPtxConvertor();
  });

  it('should map a dataSet to a dataResource', function () {
    const mapping = convertor.mapDataSetToDataResource(gaiaxDataSet as unknown as IDataSet);
    expect(mapping).to.exist;
    expect(mapping).to.be.an('object');

    expect(mapping).to.have.property('_id', gaiaxDataSet['dct:identifier']);
    expect(mapping).to.have.property('representation').that.is.an('object').that.is.not.empty;
    expect(mapping).to.have.property('apiResponseRepresentation').that.is.an('object').that.is.not.empty;
  });

  it('should map a dataSet to a softwareResource', async function () {
    const mapping = convertor.mapDataSetToSoftwareResource(gaiaxDataSet2 as unknown as IDataSet);
    expect(mapping).to.exist;
    expect(mapping).to.be.an('object');

    expect(mapping).to.have.property('_id', gaiaxDataSet2['dct:identifier']);
    expect(mapping).to.have.property('representation').that.is.an('object').that.is.not.empty;
  });

  it('should map a dataProduct to a serviceOffering', async function () {
    const mapping = await convertor.mapDataProductToServiceOffering(dataProduct as unknown as DataProduct);
    expect(mapping).to.exist;
    expect(mapping).to.be.an('object');

    expect(mapping).to.have.property('_id', dataProduct['dct:identifier']);
    expect(mapping).to.have.property('policy').that.is.an('array').that.is.not.empty;
  });

  it('should map a Gaia-X Catalog to a Prometheus-X Catalog', async function () {
    const mapping = await convertor.mapGaiaXCatalogToPtxCatalog(gaiaxDataCatalog as unknown as DataCatalog);
    expect(mapping).to.exist;
    expect(mapping).to.be.an('object');

    expect(mapping).to.have.property('serviceOfferings').that.is.an('array').that.is.not.empty;
    expect(mapping).to.have.property('dataResources').that.is.an('array').that.is.not.empty;
    expect(mapping).to.have.property('softwareResources').that.is.an('array').that.is.not.empty;
  });
});
