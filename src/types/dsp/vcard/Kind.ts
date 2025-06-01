export class Kind {
  // custom properties
  public url: string | string[];

  constructor(init: { url: string | string[] }) {
    this.url = init.url;
  }
}
