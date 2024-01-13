import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '@cookbook/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

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
}
