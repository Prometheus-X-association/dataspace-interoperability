export interface IChecksum {
    'spdx:algorithm': unknown;
    'spdx:checksumValue': unknown;
}

export class Checksum implements IChecksum {
  public 'spdx:algorithm': unknown;
  public 'spdx:checksumValue': unknown;
}
