import Aes from 'react-native-aes-crypto';
import Config from 'react-native-config';

export class EncryptionService {
  private _key: string;
  private _iv: string;

  constructor() {
    this._key = Config.AES_KEY;
    this._iv = Config.AES_IV;
  }

  encrypt = (text: string) => {
    return Aes.encrypt(text, this._key, this._iv, 'aes-256-cbc');
  };

  decrypt = (encryptedText: string) => {
    return Aes.decrypt(encryptedText, this._key, this._iv, 'aes-256-cbc');
  };
}
