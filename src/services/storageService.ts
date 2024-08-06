import {MMKV} from 'react-native-mmkv';

enum STORAGE_KEY {
  IS_LOGIN = 'IS_LOGIN',
  ACCESS_TOKEN = 'ACCESS_TOKEN',
	USERNAME = 'USERNAME',
	EMAIL = 'EMAIL'
}

export class StorageService {
  private _storage: MMKV;

  constructor() {
    this._storage = new MMKV();
  }

  login = () => {
    this._storage.set(STORAGE_KEY.IS_LOGIN, true);
  };

  logout = () => {
    this._storage.delete(STORAGE_KEY.IS_LOGIN);
    this._storage.delete(STORAGE_KEY.ACCESS_TOKEN);
  };

  isLoggedIn = () => {
    return this._storage.getBoolean(STORAGE_KEY.IS_LOGIN);
  };

  getToken = () => {
    return this._storage.getString(STORAGE_KEY.ACCESS_TOKEN);
  };

  setToken = (token: string) => {
    this._storage.set(STORAGE_KEY.ACCESS_TOKEN, token);
  };

	getUsername = () => {
    return this._storage.getString(STORAGE_KEY.USERNAME);
  };

  setUsername = (name: string) => {
    this._storage.set(STORAGE_KEY.USERNAME, name);
  };

	getEmail = () => {
    return this._storage.getString(STORAGE_KEY.EMAIL);
  };

  setEmail = (email: string) => {
    this._storage.set(STORAGE_KEY.EMAIL, email);
  };
}
