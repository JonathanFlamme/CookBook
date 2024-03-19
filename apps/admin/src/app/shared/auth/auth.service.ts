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

  private isAdminInSubject = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdminInSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
    private readonly router: Router,
  ) {}

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
          this.isAdmin();
        }),
      );
  }

  public autoLogin(): void {
    const user = this.storageService.getSavedUser();
    if (user) {
      this.isLoggedInSubject.next(user);
      this.isAdmin();
    }
  }
  public logout(): void {
    this.http
      .post(`${this.baseUrl}/auth/logout`, {}, { withCredentials: true })
      .subscribe({
        next: () => {
          this.isLoggedInSubject.next(null);
          this.isAdmin();
          this.router.navigate(['/admin/login']);
        },
      });
    this.storageService.clean();
  }

  // check if user is admin

  public isAdmin(): void {
    const user = this.storageService.getSavedUser();
    if (!user) {
      this.isAdminInSubject.next(false);
    }
    if (user?.role === UserRole.Admin) {
      this.isAdminInSubject.next(true);
    }
  }
}
