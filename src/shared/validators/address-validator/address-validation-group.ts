import { CepValidator } from './cep-validator';
import { AppError } from '@/shared/errors/AppError';
import { IValidate } from '../IValidate';

export class AddressValidationGroup implements IValidate {
  constructor(private cepValidator: CepValidator) {}

  public validate(cep: number): boolean {
    const cepVerify = this.cepValidator.validate(cep);

    if (!cepVerify) {
      throw new AppError('cep');
    } else {
      return true;
    }
  }
}

const cepValidator = new CepValidator();
export const addressValidationGroup = new AddressValidationGroup(cepValidator);
