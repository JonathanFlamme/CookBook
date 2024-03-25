import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserEditRoleComponent } from './user-edit-role.component';

describe('UserEditRoleComponent', () => {
  let component: UserEditRoleComponent;
  let fixture: ComponentFixture<UserEditRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEditRoleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserEditRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
