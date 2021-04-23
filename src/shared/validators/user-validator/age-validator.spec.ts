import { AgeValidator } from './age-validator';

describe('validation age', () => {
  it('should return a true if age is valid', () => {
    const ageValidate = new AgeValidator();

    const age = 1;

    const isValid = ageValidate.validate(age);

    expect(isValid).toBeTruthy();
  });

  it('should return a false if age is invalid', () => {
    const ageValidate = new AgeValidator();

    const age = -1;

    const isValid = ageValidate.validate(age);

    expect(isValid).toBeFalsy();
  });
});
