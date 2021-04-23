import { AgeValidator } from './age-validator';
import { EmailValidator } from './email-validator';
import { PhoneNumberValidator } from './phone-validator';
import { UserValidationGroup } from './user-validation-group';
import { WeightValidator } from './weight-validator';

describe('weight validator', () => {
  let weightValidator: WeightValidator;
  let ageValidator: AgeValidator;
  let emailValidator: EmailValidator;
  let phoneNumberValidator: PhoneNumberValidator;
  let userValidationGroup: UserValidationGroup;
  beforeEach(() => {
    weightValidator = new WeightValidator();
    ageValidator = new AgeValidator();
    emailValidator = new EmailValidator();
    phoneNumberValidator = new PhoneNumberValidator();
    userValidationGroup = new UserValidationGroup(
      emailValidator,
      phoneNumberValidator,
      ageValidator,
      weightValidator,
    );
  });

  it('should be return true', () => {
    const data = {
      email: 'johndoe@email.com',
      telephone: 92929292,
      age: 91,
      weight: 50.5,
    };

    const isValid = userValidationGroup.validate(data);

    expect(isValid).toBeTruthy();
  });
});
