import { IHashProvider } from '../models/IHash';
import { hash, compare } from 'bcrypt';

export class Hash implements IHashProvider {
  public async encrypt(plainText: string): Promise<string> {
    return await hash(plainText, 8);
  }
  public async compareHash(
    hashed: string,
    plainText: string,
  ): Promise<boolean> {
    return await compare(hashed, plainText);
  }
}
