import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserModel } from '@cookbook/models';
import { UserService } from '../../shared/users/user.service';

@Component({
  selector: 'app-user-edit',
  standalone: false,
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})
export class UserEditComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: { user: UserModel },
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
  ) {}

  public profileForm = this.fb.group({
    userName: this.fb.control<string>(this.data.user.userName),
    givenName: this.fb.control<string>(this.data.user.givenName),
    familyName: this.fb.control<string>(this.data.user.familyName),
    email: this.fb.control<string>(this.data.user.email),
  });

  ngOnInit(): void {
    this.profileForm.patchValue(this.data.user);
  }

  public edit(): void {
    const { userName, givenName, familyName, email } = this.profileForm.value;

    this.userService
      .edit(userName!, givenName!, familyName!, email!)
      .subscribe({
        next: (profile) => {
          this.dialogRef.close(profile);
        },
        error: () => this.dialogRef.close(),
      });
  }
}
