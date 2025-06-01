import { skos } from '.';

export class ConceptScheme {
  public themes: skos.Concept[];
  public themeTaxonomy: string;

  constructor(init: { themes?: skos.Concept[]; themeTaxonomy?: string }) {
    this.themes = init.themes || [];
    this.themeTaxonomy = init.themeTaxonomy || '';
  }
}
