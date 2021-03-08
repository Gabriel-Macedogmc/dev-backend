import { EthnicityType } from '../infra/typeorm/entities/User';

export interface IUser {
  name: string;
  telephone: string;
  email: string;
  password: string;
  age: string;
  weight: string;
  ethnicity: EthnicityType;
}
