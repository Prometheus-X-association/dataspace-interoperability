import { skos } from '.';

export class Concept {
  public inScheme?: skos.ConceptScheme;
  public topConceptOf?: skos.ConceptScheme;
  public definition: any;

  constructor(init: { inScheme?: skos.ConceptScheme; topConceptOf?: skos.ConceptScheme; definition: any }) {
    this.inScheme = new skos.ConceptScheme({});
    this.topConceptOf = new skos.ConceptScheme({});
    this.definition = init.definition;
  }
}
