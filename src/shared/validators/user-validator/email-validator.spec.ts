import { EmailValidator } from './email-validator';
describe('email validation', () => {
  it('should be return true if email is valid ', () => {
    const emailValidate = new EmailValidator();

    const email = 'johndoe@gmail.com';

    const isValid = emailValidate.validate(email);

    expect(isValid).toBeTruthy();
  });

  it('should be return false if email is invalid ', () => {
    const emailValidate = new EmailValidator();

    const email = 'johndoe';

    const isValid = emailValidate.validate(email);

    expect(isValid).toBeFalsy();
  });
});
