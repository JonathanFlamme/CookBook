import { Component, Input } from '@angular/core';
import { UserModel } from '@cookbook/models';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent {
  @Input() public users: UserModel[] = [];

  public displayedColumns: string[] = ['name', 'email', 'role'];
}
