import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequest, UserRole, UserToken } from '@cookbook/models';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { SnackBarComponent } from '../ui/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.yummyBookUrl}`;

  private isLoggedInSubject = new BehaviorSubject<UserRequest | null>(null);
  public isLogged$ = this.isLoggedInSubject.asObservable();

  private isAdminInSubject = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdminInSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
  ) {}

  public login(username: string, password: string): Observable<UserToken> {
    return this.http
      .post<UserToken>(`${this.baseUrl}/login`, {
        username,
        password,
      })
      .pipe(
        catchError((error) => {
          throw error;
        }),
        tap((authToken) => {
          this.storageService.saveUser(authToken.payload);
          this.isLoggedInSubject.next(authToken.payload);
          this.isAdmin();
          this.storageService.saveToken(authToken.access_token); // --- WITHOUT COOKIE - store JWT in localStorage ---  Remove it when cookie mode//
          this.storageService.setExpiration();
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
    this.http.post(`${this.baseUrl}/logout`, {}).subscribe({
      next: () => {
        this.isLoggedInSubject.next(null);
        this.isAdmin();
        this.router.navigate(['/login']);
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          data: { message: 'Vous êtes maintenant déconnecté' },
        });
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
