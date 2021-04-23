import { AppError } from '@/shared/errors/AppError';
import { IValidate } from '../IValidate';
import { AgeValidator } from './age-validator';
import { EmailValidator } from './email-validator';
import { PhoneNumberValidator } from './phone-validator';
import { WeightValidator } from './weight-validator';

interface IInpuntValidation {
  email: string;
  telephone: number;
  age: number;
  weight: number;
}

export class UserValidationGroup implements IValidate {
  constructor(
    private emailValidator: EmailValidator,
    private phoneNumberValidator: PhoneNumberValidator,
    private ageValidator: AgeValidator,
    private WeightValidator: WeightValidator,
  ) {}

  public validate({
    email,
    telephone,
    age,
    weight,
  }: IInpuntValidation): boolean {
    const emailVerify = this.emailValidator.validate(email);
    const phoneNumberVerify = this.phoneNumberValidator.validate(telephone);
    const ageVerify = this.ageValidator.validate(age);
    const wheightVerify = this.WeightValidator.validate(weight);

    if (!emailVerify) {
      throw new AppError('email');
    } else if (!phoneNumberVerify) {
      throw new AppError('phone');
    } else if (!ageVerify) {
      throw new AppError('age');
    } else if (!wheightVerify) {
      throw new AppError('weight');
    } else {
      return true;
    }
  }
}

const emailValidator = new EmailValidator();
const phoneNumberValidator = new PhoneNumberValidator();
const ageValidator = new AgeValidator();
const weightValidator = new WeightValidator();

export const userValidationGroup = new UserValidationGroup(
  emailValidator,
  phoneNumberValidator,
  ageValidator,
  weightValidator,
);
