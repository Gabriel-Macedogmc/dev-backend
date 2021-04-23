import { EthnicityType } from '../infra/typeorm/entities/User';

export interface IUser {
  name: string;
  telephone: number;
  email: string;
  password: string;
  age: number;
  weight: number;
  ethnicity: EthnicityType;
}
