import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipesFilterBottomSheetComponent } from './recipes-filter-bottom-sheet.component';

describe('RecipesFilterBottomSheetComponent', () => {
  let component: RecipesFilterBottomSheetComponent;
  let fixture: ComponentFixture<RecipesFilterBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipesFilterBottomSheetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesFilterBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
