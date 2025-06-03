export class Agent {
  public account: string;

  constructor(init: { account?: string }) {
    this.account = init.account || '';
  }
}
