import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryType, RecipeModel } from '@cookbook/models';
import { RecipeService } from '../../shared/recipes/recipe.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientService } from '../../shared/ingredients/ingredient.service';
import { MatDialog } from '@angular/material/dialog';
import { IngredientDeleteConfirmComponent } from '../ingredient-delete-confirm/ingredient-delete-confirm.component';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss',
})
export class RecipeEditComponent implements OnInit {
  public loading = true;
  public recipe!: RecipeModel;
  public categories = Object.values(CategoryType);

  private recipeId!: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private readonly recipeService: RecipeService,
    private readonly ingredientService: IngredientService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog,
  ) {}

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get steps(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }

  public recipeForm = this.fb.group({
    title: this.fb.nonNullable.control<string>('', Validators.required),
    duration: this.fb.nonNullable.control<string>('', Validators.required),
    categories: this.fb.nonNullable.control<CategoryType>(
      CategoryType.Apero,
      Validators.required,
    ),
    ingredients: this.fb.array<FormGroup>([]),
    steps: this.fb.array<FormGroup>([]),
  });

  addIngredient() {
    this.ingredients.push(
      this.fb.group({
        name: this.fb.nonNullable.control<string>('', Validators.required),
        quantity: this.fb.nonNullable.control<string>('', Validators.required),
      }),
    );
  }

  addStep() {
    this.steps.push(
      this.fb.group({
        description: this.fb.control<string>('', Validators.required),
      }),
    );
  }

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.params['recipeId'];

    const sub = this.recipeService.view(this.recipeId).subscribe({
      next: (recipe) => {
        // fill the form with the recipe data
        this.recipeForm.patchValue({
          title: recipe.title,
          duration: recipe.duration,
        });

        // fill the form with the recipe.ingredient data
        recipe.ingredients.forEach((ingredient) => {
          this.ingredients.push(
            this.fb.group({
              name: this.fb.nonNullable.control<string>(
                ingredient.name,
                Validators.required,
              ),
              quantity: this.fb.nonNullable.control<string>(
                ingredient.quantity,
                Validators.required,
              ),
            }),
          );
        });

        // fill the form with the recipe.steps data
        recipe.steps.forEach((step) => {
          this.steps.push(
            this.fb.group({
              description: this.fb.control<string>(
                step.description,
                Validators.required,
              ),
            }),
          );
        });

        // fill the form with the recipe.categories data
        this.recipeForm.patchValue({
          categories: recipe.categories[0].type,
        });
        this.recipe = recipe;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
    this.subscriptions.push(sub);
  }

  edit() {
    const recipe = this.recipeForm.value;
    const sub = this.recipeService
      .update(
        this.recipeId,
        recipe.title!,
        recipe.duration!,
        recipe.ingredients!,
        recipe.steps!,
        recipe.categories!,
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/recipes', this.recipeId]);
        },
        error: (error) => {
          console.log(error);
        },
      });
    this.subscriptions.push(sub);
  }

  public delete(index: number): void {
    const dialogRef = this.dialog.open(IngredientDeleteConfirmComponent, {
      data: this.recipe.ingredients[index],
    });

    dialogRef.afterClosed().subscribe((ingredient) => {
      if (ingredient) {
        this.router.navigate(['/recipes', this.recipeId]);
      }
    });
  }
}
