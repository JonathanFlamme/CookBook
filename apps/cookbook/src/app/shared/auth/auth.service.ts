import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel, UserRole } from '@cookbook/models';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  private isLoggedInSubject = new BehaviorSubject<UserModel | null>(null);
  public isLogged$ = this.isLoggedInSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
    private readonly router: Router,
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
      .post<UserModel>(
        `${this.baseUrl}/auth/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          throw error;
        }),
        tap((user) => {
          this.storageService.saveUser(user);
          this.isLoggedInSubject.next(user);
        }),
      );
  }

  public autoLogin(): void {
    const user = this.storageService.getSavedUser();
    if (user) {
      this.isLoggedInSubject.next(user);
    }
  }

  public logout(): void {
    this.storageService.clean();
    this.isLoggedInSubject.next(null);
    this.router.navigate(['/login']);
  }

  // check if user is admin

  public isAdmin(): boolean {
    const user = this.storageService.getSavedUser();
    if (!user) {
      return false;
    }
    if (user.role === UserRole.Admin) {
      return true;
    }
    return false;
  }
}
