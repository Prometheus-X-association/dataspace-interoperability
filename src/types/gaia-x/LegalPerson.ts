/**
 * Represents the address of the headquarter.
 * @interface IHeadquarterAddress
 * @property {string} [streetAddress] - Street Address.
 * @property {string} [postalCode] - Postal Code.
 * @property {string} [region] - Region.
 * @property {string} [locality] - Locality.
 * @property {string} countryName - Country Name.
 */
export interface IHeadquarterAddress {
    streetAddress?: string;
    postalCode?: string;
    region?: string;
    locality?: string;
    countryName: string;
}

/**
 * Represents the legal address.
 * @interface ILegalAddress
 * @property {string} [streetAddress] - Street Address.
 * @property {string} [postalCode] - Postal Code.
 * @property {string} [region] - Region.
 * @property {string} [locality] - Locality.
 * @property {string} country - Country.
 */
export interface ILegalAddress {
    streetAddress?: string;
    postalCode?: string;
    region?: string;
    locality?: string;
    country: string;
}

/**
 * Represents a legal person entity.
 * @interface ILegalPerson
 * @property {string[]} [parentOrganisation] - A list of direct participant that this entity is a subOrganization of, if any.
 * @property {string} [name] - Name of participant.
 * @property {string} [registrationNumber] - Country's registration number which identifies one specific company.
 * @property {string} [LEICode] - Unique LEI number as defined by https://www.gleif.org.
 * @property {IHeadquarterAddress} [headquarterAddress] - Physical location of head quarter in ISO 3166-2 alpha2, alpha-3 or numeric format.
 * @property {ILegalAddress} [legalAddress] - Physical location of legal quarter in ISO 3166-1 alpha2, alpha-3 or numeric format.
 */
export interface ILegalPerson {
    parentOrganisation?: string[];
    name?: string;
    registrationNumber?: string;
    LEICode?: string;
    headquarterAddress?: IHeadquarterAddress;
    legalAddress?: ILegalAddress;
}

/**
 * Implementation of ILegalPerson.
 * @class LegalPerson
 * @implements {ILegalPerson}
 */
export class LegalPerson implements ILegalPerson{
  public parentOrganisation?: string[];
  public name?: string;
  public registrationNumber?: string;
  public LEICode?: string;
  public headquarterAddress?: IHeadquarterAddress;
  public legalAddress?: ILegalAddress;

  /**
   * Constructs a new LegalPerson instance.
   * @param init - The initialization object.
   */
  constructor(init: ILegalPerson) {
    Object.assign(this, init);
  }

  /**
   * Converts the instance to a JSON object.
   * @returns {ILegalPerson} The JSON representation of the instance.
   */
  public toJSON(): ILegalPerson {
    return {
      parentOrganisation: this.parentOrganisation,
      name: this.name,
      registrationNumber: this.registrationNumber,
      LEICode: this.LEICode,
      headquarterAddress: this.headquarterAddress,
      legalAddress: this.legalAddress
    };
  }
}
