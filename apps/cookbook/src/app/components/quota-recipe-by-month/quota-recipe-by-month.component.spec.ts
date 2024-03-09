import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuotaRecipeByMonthComponent } from './quota-recipe-by-month.component';

describe('QuotaRecipeByMonthComponent', () => {
  let component: QuotaRecipeByMonthComponent;
  let fixture: ComponentFixture<QuotaRecipeByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotaRecipeByMonthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuotaRecipeByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
