import { IValidate } from '../IValidate';

export class AgeValidator implements IValidate {
  public validate(age: number): boolean {
    if (age <= 0) {
      return false;
    }
    return true;
  }
}
