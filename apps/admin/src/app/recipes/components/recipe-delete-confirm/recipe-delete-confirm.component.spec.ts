import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeDeleteConfirmComponent } from './recipe-delete-confirm.component';

describe('RecipeDeleteConfirmComponent', () => {
  let component: RecipeDeleteConfirmComponent;
  let fixture: ComponentFixture<RecipeDeleteConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeDeleteConfirmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
