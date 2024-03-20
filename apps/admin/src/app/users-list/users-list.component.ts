import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/users/user.service';
import { UserModel } from '@cookbook/models';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  public users: UserModel[] = [];

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.userService.list().subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }
}
