import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../shared/users/user.service';
import { MatButtonModule } from '@angular/material/button';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-verification-email',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './verification-email.component.html',
  styleUrl: './verification-email.component.scss',
})
export class VerificationEmailComponent implements OnInit {
  public state: 'loading' | 'error' | 'invalid' | 'done' = 'loading';
  public errorMessage: string = 'error';
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  public ngOnInit() {
    this.route.params
      .pipe(mergeMap(({ token }) => this.userService.verify(token)))
      .subscribe({
        next: () => (this.state = 'done'),
        error: (error) => {
          this.state = error.status === 400 ? 'invalid' : 'error';
          this.errorMessage = error.message;
        },
      });
  }
}
