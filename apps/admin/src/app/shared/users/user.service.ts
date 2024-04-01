import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel, UserRole } from '@cookbook/models';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.yummyBookUrl}/admin`;

  constructor(private readonly http: HttpClient) {}

  public list(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.baseUrl}/users`);
  }
  public updateRole(userId: string, role: UserRole): Observable<UserModel> {
    return this.http.patch<UserModel>(
      `${this.baseUrl}/users/${userId}`,
      { role },
      { withCredentials: true },
    );
  }

  public delete(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${userId}`);
  }
}
