import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '@cookbook/models';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.yummyBookUrl;

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

  public edit(
    userName: string,
    givenName: string,
    familyName: string,
    email: string,
  ): Observable<UserModel> {
    return this.http.patch<UserModel>(`${this.baseUrl}/profile`, {
      userName,
      givenName,
      familyName,
      email,
    });
  }

  public delete(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/profile/${userId}`);
  }
}
