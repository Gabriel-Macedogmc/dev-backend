export interface IHashProvider {
  encrypt(plainText: string): Promise<string>;
  compareHash(hashed: string, plainText: string): Promise<boolean>;
}
