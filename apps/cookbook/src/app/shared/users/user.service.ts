import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '@cookbook/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

  public view(): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseUrl}/profile`);
  }

  public verify(token: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/verify`, { token });
  }

  public changePassword(
    currentPassword: string,
    password: string,
  ): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/profile/password`, {
      currentPassword,
      password,
    });
  }

  public forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/forgot`, { email });
  }

  public verifyResetToken(token: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/verify-reset-token`, {
      token,
    });
  }

  public changePasswordWithToken(
    token: string,
    password: string,
  ): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/reset`, { token, password });
  }
}
