import { IValidate } from '../IValidate';

export class CepValidator implements IValidate {
  public validate(cep: number): boolean {
    const verify = /^([\d]{2})\.*([\d]{3})*([\d]{3})/;
    return verify.test(cep.toString());
  }
}
