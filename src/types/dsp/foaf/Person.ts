export class Person {
  public name: string;
  public homepage: string;

  constructor(init: { name?: string; homepage?: string }) {
    this.name = init.name || '';
    this.homepage = init.homepage || '';
  }
}
