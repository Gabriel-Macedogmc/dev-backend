import { PhoneNumberValidator } from './phone-validator';
describe('validation phone number', () => {
  it('should be return true if number is valid', () => {
    const numberValidate = new PhoneNumberValidator();

    const phone = 974216714;

    const isValid = numberValidate.validate(phone);

    expect(isValid).toBeTruthy();
  });

  it('should be return false if number is invalid', () => {
    const numberValidate = new PhoneNumberValidator();

    const phone = 123123123;

    const isValid = numberValidate.validate(phone);

    expect(isValid).toBeFalsy();
  });
});
