import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel, UserRole } from '@cookbook/models';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { SnackBarComponent } from '../../components/ui/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private readonly snackBar: MatSnackBar,
  ) {}

  public login(username: string, password: string): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${this.baseUrl}/auth/login`, {
        username,
        password,
      })
      .pipe(
        catchError((error) => {
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
    this.storageService.clean();
    this.http.post(`${this.baseUrl}/auth/logout`, {}).subscribe({
      next: () => {
        this.isLoggedInSubject.next(null);
        this.isAdmin();
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          data: { message: 'Vous êtes maintenant déconnecté' },
        });
      },
    });
  }

  // check if user is admin
  public isAdmin(): void {
    const user = this.storageService.getSavedUser();
    if (!user) {
      this.isAdminInSubject.next(false);
    }
    if (user?.role === UserRole.Admin) {
      this.isAdminInSubject.next(true);
    } else {
      this.isAdminInSubject.next(false);
    }
  }

  // check if user is logged
  public isLogged(): boolean {
    const user = this.storageService.getSavedUser();
    if (!user) {
      return false;
    }
    return true;
  }
}
