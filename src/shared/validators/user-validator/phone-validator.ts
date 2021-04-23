import { IValidate } from '../IValidate';

export class PhoneNumberValidator implements IValidate {
  public validate(phoneNumber: number): boolean {
    const verify = /^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/gm;
    return verify.test(phoneNumber.toString());
  }
}
