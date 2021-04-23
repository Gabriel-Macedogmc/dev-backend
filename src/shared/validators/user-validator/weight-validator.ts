import { IValidate } from './../IValidate';

export class WeightValidator implements IValidate {
  public validate(weight: number): boolean {
    if (weight <= 0) {
      return false;
    }

    return true;
  }
}
