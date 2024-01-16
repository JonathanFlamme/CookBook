import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '@cookbook/models';
import { Observable, tap } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
  ) {}

  public register(
    givenName: string,
    familyName: string,
    email: string,
    password: string,
    confirmPassword: string,
  ): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.baseUrl}/register`, {
      givenName,
      familyName,
      email,
      password,
      confirmPassword,
    });
  }

  public login(username: string, password: string): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${this.baseUrl}/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap((user) => {
          this.storageService.saveUser(user);
        }),
      );
  }
}
