import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepDeleteConfirmComponent } from './step-delete-confirm.component';

describe('StepDeleteConfirmComponent', () => {
  let component: StepDeleteConfirmComponent;
  let fixture: ComponentFixture<StepDeleteConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepDeleteConfirmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
