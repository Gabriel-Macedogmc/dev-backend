import { IHashProvider } from './../models/IHash';
export class InMemoryHashProvider implements IHashProvider {
  public async encrypt(plainText: string): Promise<string> {
    return plainText;
  }

  public async compareHash(
    hashed: string,
    plainText: string,
  ): Promise<boolean> {
    return hashed === plainText;
  }
}
