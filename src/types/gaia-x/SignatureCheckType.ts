/**
 * Interface representing a Signature Check Type.
 * @interface ISignatureCheckType
 * @property {'gx:participantRole'} gx:participantRole - Establish a unique way to identify the participant that has to Sign (e.g. gx:providedBy is identified by Provider).
 * @property {'gx:mandatory'} gx:mandatory - Establish if a Signature is mandatory or Optional.
 * @property {'gx:legalValidity'} gx:legalValidity - Establish if the legal validity check needs to be enforced to the Signature.
 */
export interface ISignatureCheckType {
    'gx:participantRole': string;
    'gx:mandatory': string;
    'gx:legalValidity': string;
}

/**
 * Implementation of ISignatureCheckType.
 * @class SignatureCheckType
 * @implements {ISignatureCheckType}
 */
export class SignatureCheckType implements ISignatureCheckType{
  public 'gx:participantRole': string;
  public 'gx:mandatory': string;
  public 'gx:legalValidity': string;

  /**
   * Constructs a new SignatureCheckType instance.
   * @param init - The initialization object.
   */
  constructor(init: ISignatureCheckType) {
    Object.assign(this, init);
  }

  /**
   * Converts the instance to a JSON object.
   * @returns {ISignatureCheckType} The JSON representation of the instance.
   */
  public toJSON(): ISignatureCheckType {
    return {
      'gx:participantRole': this['gx:participantRole'],
      'gx:mandatory': this['gx:mandatory'],
      'gx:legalValidity': this['gx:legalValidity']
    };
  }
}
