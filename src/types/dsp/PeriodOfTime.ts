export interface IPeriodOfTime {
    'dcat:startDate': string;
    'dcat:endDate': string;
    'time:hasBeginning': string;
    'time:hasEnd': string;
}

export class PeriodOfTime implements IPeriodOfTime {
  public 'dcat:startDate': string;
  public 'dcat:endDate': string;
  public 'time:hasBeginning': string;
  public 'time:hasEnd': string;
}
