import { Component, Input } from '@angular/core';
import { UserRole } from '@cookbook/models';

@Component({
  selector: 'app-user-role',
  template: `
    <ng-container [ngSwitch]="role">
      <span *ngSwitchCase="roles.Admin">Administrateur</span>
      <span *ngSwitchCase="roles.User">Utilisateur</span>
    </ng-container>
  `,
  styles: [],
})
export class UserRoleComponent {
  @Input() role!: UserRole;
  public roles = UserRole;
}
