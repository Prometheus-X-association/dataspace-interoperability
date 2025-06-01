import { IDatasetSeries } from './DatasetSeries';
import { dcterms } from './dcterms';
import { IDistribution } from './Distribution';
import { IResource, Resource } from './Resource';

export interface IDataset extends IResource{
    'dcat:distribution'?: IDistribution | IDistribution[];
    'dcterms:accrualPeriodicity'?: string;
    'dcat:inSeries'?: IDatasetSeries;
    'dcterms:spatial'?: string; // geographicalCoverage;
    'dcat:spatialResolutionInMeters'?: number;
    'dcterms:temporal'?: dcterms.PeriodOfTime;
    'dcat:temporalResolution'?: string;
}

export class Dataset extends Resource implements IDataset {
  public 'dcat:distribution'?: IDistribution | IDistribution[];
  public 'dcterms:accrualPeriodicity'?: string;
  public 'dcat:inSeries'?: IDatasetSeries;
  public 'dcterms:spatial'?: string; // geographicalCoverage;
  public 'dcat:spatialResolutionInMeters'?: number;
  public 'dcterms:temporal'?: dcterms.PeriodOfTime;
  public 'dcat:temporalResolution'?: string;

  /**
   * Converts the instance to a JSON object.
   * @returns {IDataset} The JSON representation of the instance.
   */
  public toJSON(): IDataset {
    return {
      ...super.toJSON(),
      'dcat:distribution': this['dcat:distribution'],
      'dcterms:accrualPeriodicity': this['dcterms:accrualPeriodicity'],
      'dcat:inSeries': this['dcat:inSeries'],
      'dcterms:spatial': this['dcterms:spatial'],
      'dcat:spatialResolutionInMeters': this['dcat:spatialResolutionInMeters'],
      'dcterms:temporal': this['dcterms:temporal'],
      'dcat:temporalResolution': this['dcat:temporalResolution']
    };
  }
}
