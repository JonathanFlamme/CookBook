import { Injectable } from '@angular/core';
import { UserModel } from '@cookbook/models';

const KEY = 'access_token';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public saveUser(user: UserModel) {
    window.localStorage.removeItem(KEY);
    window.localStorage.setItem(KEY, JSON.stringify(user));
  }

  public getSavedUser(): UserModel | null {
    const user = window.localStorage.getItem(KEY);

    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }

  public clean() {
    window.localStorage.clear();
  }
}
