import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngredientDeleteConfirmComponent } from './ingredient-delete-confirm.component';

describe('IngredientDeleteConfirmComponent', () => {
  let component: IngredientDeleteConfirmComponent;
  let fixture: ComponentFixture<IngredientDeleteConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngredientDeleteConfirmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
