import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '@cookbook/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/admin';

  constructor(private readonly http: HttpClient) {}

  public list(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.baseUrl}/users`, {
      withCredentials: true,
    });
  }
}
