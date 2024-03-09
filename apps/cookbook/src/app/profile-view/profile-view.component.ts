import { Component, OnInit } from '@angular/core';
import { UserModel, UserRole } from '@cookbook/models';
import { UserService } from '../shared/users/user.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss',
})
export class ProfileViewComponent implements OnInit {
  public loading = true;
  public profile!: UserModel;

  public UserRole = UserRole;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.userService.view().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }
}
