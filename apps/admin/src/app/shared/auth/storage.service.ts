import { Injectable } from '@angular/core';
import { UserRequest } from '@cookbook/models';

const KEY = 'user';
const JWT_KEY = 'access_token'; // --- WITHOUT COOKIE - store JWT in localStorage --- //
const expiration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public saveUser(user: UserRequest) {
    window.localStorage.removeItem(KEY);
    window.localStorage.setItem(KEY, JSON.stringify(user));
  }

  public getSavedUser(): UserRequest | null {
    const user = window.localStorage.getItem(KEY);

    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }

  public clean() {
    window.localStorage.clear();
  }
  // --- WITHOUT COOKIEq - store JWT in localStorage --- //
  public saveToken(token: string) {
    window.localStorage.removeItem(JWT_KEY);
    window.localStorage.setItem(JWT_KEY, token);
  }
  public setExpiration() {
    setTimeout(() => {
      localStorage.removeItem(KEY);
      localStorage.removeItem(JWT_KEY);
    }, expiration);
  }
}
