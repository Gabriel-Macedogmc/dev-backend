import { IValidate } from '../IValidate';

export class EmailValidator implements IValidate {
  public validate(email: string): boolean {
    const verify = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/i;
    return verify.test(email);
  }
}
