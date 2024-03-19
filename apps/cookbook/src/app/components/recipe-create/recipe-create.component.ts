import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryType, UnitList } from '@cookbook/models';
import { RecipeService } from '../../shared/recipes/recipe.service';
import { Observable, Subscription, map, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { unitListLabels } from '../../shared/ingredients/unit-list-label';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../ui/snack-bar/snack-bar.component';
import { categoriesLabel } from '../ui/category-label';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UploadService } from '../../shared/upload/upload-image.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrl: './recipe-create.component.scss',
})
export class RecipeCreateComponent implements OnDestroy {
  public unitListLabel: { value: UnitList; label: string }[] = unitListLabels;
  public categoriesLabel: { value: string; label: string }[] = categoriesLabel;
  public uploadApi: File | null = null;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private readonly recipeService: RecipeService,
    private readonly uploadService: UploadService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
  ) {}

  // isMediumScreen > 960px
  public isMediumScreen$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .pipe(map((result) => !result.matches));

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get steps(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }

  public recipeForm = this.fb.group({
    title: this.fb.nonNullable.control<string>('', Validators.required),
    duration: this.fb.nonNullable.control<string>('', Validators.required),
    categories: this.fb.nonNullable.control<CategoryType[]>(
      [],
      Validators.required,
    ),
    ingredients: this.fb.array<FormGroup>([]),
    steps: this.fb.array<FormGroup>([]),
  });

  addIngredient() {
    // Check if there are already 10 ingredients
    if (this.ingredients.length >= 10) {
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: 2000,
        data: {
          message:
            'Il ne peut pas y avoir plus de 10 ingrédients dans une recette',
          success: false,
        },
      });
      return;
    }

    this.ingredients.push(
      this.fb.group({
        name: this.fb.nonNullable.control<string>('', Validators.required),
        quantity: this.fb.nonNullable.control<string>('', Validators.required),
        unit: this.fb.nonNullable.control<UnitList>(
          UnitList.Gram,
          Validators.required,
        ),
      }),
    );
  }

  addStep() {
    // Check if there are already 10 steps
    if (this.steps.length >= 10) {
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: 2000,
        data: {
          message: 'Il ne peut pas y avoir plus de 10 étapes dans une recette',
          success: false,
        },
      });
      return;
    }

    this.steps.push(
      this.fb.group({
        description: this.fb.control<string>('', Validators.required),
        sort: this.fb.control<number>(this.steps.length, Validators.required),
      }),
    );
  }
  createWithoutUpload() {
    const recipe = this.recipeForm.value;
    const imageUrl: string = '';

    const sub = this.recipeService
      .create(
        recipe.title!,
        recipe.duration!,
        recipe.ingredients!,
        recipe.steps!,
        recipe.categories!,
        imageUrl,
      )
      .subscribe({
        next: () => {
          this.snackBar.openFromComponent(SnackBarComponent, {
            duration: 2000,
            data: { message: 'La recette a bien été ajoutée', success: true },
          });
          this.router.navigate(['/recipes']);
        },
        error: (error) => {
          this.snackBar.openFromComponent(SnackBarComponent, {
            duration: 2000,
            data: { message: "Une erreur s'est produite", success: false },
          });
          console.error(error);
        },
      });
    this.subscriptions.push(sub);
  }
  public createWithUpload() {
    const recipe = this.recipeForm.value;
    const sub = this.uploadService
      .uploadImage(this.uploadApi!)
      .pipe(
        switchMap((imageUrl) => {
          return this.recipeService.create(
            recipe.title!,
            recipe.duration!,
            recipe.ingredients!,
            recipe.steps!,
            recipe.categories!,
            imageUrl,
          );
        }),
      )
      .subscribe({
        next: () => {
          this.snackBar.openFromComponent(SnackBarComponent, {
            duration: 2000,
            data: { message: 'La recette a bien été ajoutée', success: true },
          });
          this.router.navigate(['/recipes']);
        },
        error: (error) => {
          this.snackBar.openFromComponent(SnackBarComponent, {
            duration: 2000,
            data: { message: "Une erreur s'est produite", success: false },
          });
          console.error(error);
        },
      });
    this.subscriptions.push(sub);
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub?.unsubscribe());
  }

  public delete(formArray: FormArray, index: number) {
    formArray.removeAt(index);

    formArray.controls.forEach((array) => {
      if (array.value.sort > index) {
        array.patchValue({ sort: array.value.sort - 1 });
      }
    });
  }

  public handleImageUrl(uploadApi: File) {
    this.uploadApi = uploadApi;
  }
}
