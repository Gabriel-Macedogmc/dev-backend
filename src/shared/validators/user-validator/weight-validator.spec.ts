import { WeightValidator } from './weight-validator';
describe('weight validation', () => {
  it('should be return true if weight is valid', () => {
    const weightValidate = new WeightValidator();

    const weight = 50.5;

    const isValid = weightValidate.validate(weight);

    expect(isValid).toBeTruthy();
  });

  it('should be return false if weight is invalid', () => {
    const weightValidate = new WeightValidator();

    const weight = -50.5;

    const isValid = weightValidate.validate(weight);

    expect(isValid).toBeFalsy();
  });
});
