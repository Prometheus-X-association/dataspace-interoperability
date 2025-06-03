export interface ILocation {
    'locn:geometry': unknown;
    'dcat:bbox': unknown;
    'dcat:centroid': unknown;
}

export class Location implements ILocation {
  public 'locn:geometry': unknown;
  public 'dcat:bbox': unknown;
  public 'dcat:centroid': unknown;
}
