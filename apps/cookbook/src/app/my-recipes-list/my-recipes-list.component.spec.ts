import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyRecipesListComponent } from './my-recipes-list.component';

describe('MyRecipesListComponent', () => {
  let component: MyRecipesListComponent;
  let fixture: ComponentFixture<MyRecipesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRecipesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyRecipesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
