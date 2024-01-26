import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryType, RecipeModel, UnitList } from '@cookbook/models';
import { RecipeService } from '../../shared/recipes/recipe.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IngredientDeleteConfirmComponent } from '../ingredient-delete-confirm/ingredient-delete-confirm.component';
import { StepDeleteConfirmComponent } from '../step-delete-confirm/step-delete-confirm.component';
import { StepService } from '../../shared/steps/step.service';
import { IngredientService } from '../../shared/ingredients/ingredient.service';
import { unitListLabels } from '../../shared/ingredients/unit-list-label';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss',
})
export class RecipeEditComponent implements OnInit {
  public loading = true;
  public recipe!: RecipeModel;
  public categories = Object.values(CategoryType);

  public unitListLabel: { value: UnitList; label: string }[] = unitListLabels;

  //buttons to ingredient
  public ingredientConfirmButton = false;
  public ingredientCancelButton = false;
  public disableDeleteIngredientButton = false;

  //buttons to step
  public stepConfirmButton = false;
  public stepCancelButton = false;
  public disableDeleteStepButton = false;
  public disableMoveStepButton = false;

  private recipeId!: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private readonly recipeService: RecipeService,
    private readonly stepService: StepService,
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
    categories: this.fb.nonNullable.control<CategoryType[]>(
      [],
      Validators.required,
    ),
    ingredients: this.fb.array<FormGroup>([]),
    steps: this.fb.array<FormGroup>([]),
  });

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
              unit: this.fb.nonNullable.control<UnitList>(
                ingredient.unit,
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
              sort: this.fb.control<number>(step.sort, Validators.required),
            }),
          );
        });

        // fill the form with the recipe.categories data
        this.recipeForm.patchValue({
          categories: recipe.categories,
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

  // Add
  addIngredient() {
    this.ingredientConfirmButton = true;
    this.disableDeleteIngredientButton = true;

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
    this.stepConfirmButton = true;
    this.disableDeleteStepButton = true;
    this.disableMoveStepButton = true;

    this.steps.push(
      this.fb.group({
        description: this.fb.control<string>('', Validators.required),
        sort: this.fb.control<number>(
          this.steps.length + 1,
          Validators.required,
        ),
      }),
    );
  }

  // Delete ingredient
  public deleteIngredient(index: number): void {
    if (!this.recipe.ingredients[index]) {
      this.ingredients.removeAt(index);

      if (this.recipe.ingredients.length === this.ingredients.value.length) {
        this.ingredientConfirmButton = false;
      }
      return;
    }
    if (this.recipe.ingredients[index]) {
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

  public deleteStep(index: number): void {
    if (!this.recipe.steps[index]) {
      this.steps.removeAt(index);

      if (this.recipe.steps.length === this.steps.value.length) {
        this.stepConfirmButton = false;
      }
      return;
    }

    if (this.recipe.steps[index]) {
      const dialogRef = this.dialog.open(StepDeleteConfirmComponent, {
        data: this.recipe.steps[index],
      });
      dialogRef.afterClosed().subscribe((step) => {
        if (step) {
          this.router.navigate(['/recipes', this.recipeId]);
        }
      });
    }
  }

  // Move
  public moveUp(formArray: FormArray, index: number): void {
    this.recipeForm.get;
    if (index <= 0) {
      return;
    }
    this.stepConfirmButton = true;
    this.stepCancelButton = true;
    this.disableDeleteStepButton = true;

    const step = formArray.controls[index].value;
    const previousStep = formArray.controls[index - 1].value;

    formArray.controls[index].patchValue({ ...previousStep, sort: step.sort });
    formArray.controls[index - 1].patchValue({
      ...step,
      sort: previousStep.sort,
    });
  }

  public moveDown(formArray: FormArray, index: number): void {
    if (index >= formArray.length - 1) {
      return;
    }
    this.stepConfirmButton = true;
    this.disableDeleteStepButton = true;
    this.stepCancelButton = true;

    const step = formArray.controls[index].value;
    const nextStep = formArray.controls[index + 1].value;

    formArray.controls[index].patchValue({ ...nextStep, sort: step.sort });
    formArray.controls[index + 1].patchValue({
      ...step,
      sort: nextStep.sort,
    });
  }

  // Validation
  public stepsValidated(): void {
    this.ingredientConfirmButton = false;
    this.ingredientCancelButton = false;
    this.disableDeleteIngredientButton = false;
    this.stepConfirmButton = false;
    this.stepCancelButton = false;
    this.disableDeleteStepButton = false;
    this.disableMoveStepButton = false;

    const sub = this.stepService
      .update(this.recipeId, this.recipeForm.value.steps!)
      .subscribe({
        next: (steps) => {
          this.recipe.steps = steps;
          this.recipeForm.patchValue({
            steps: steps,
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
    this.subscriptions.push(sub);
  }

  public ingredientsValidated(): void {
    this.ingredientConfirmButton = false;
    this.disableDeleteIngredientButton = false;

    const sub = this.ingredientService
      .update(this.recipeId, this.recipeForm.value.ingredients!)
      .subscribe({
        next: (ingredients) => {
          this.recipe.ingredients = ingredients;
          this.recipeForm.patchValue({
            ingredients: ingredients,
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
    this.subscriptions.push(sub);
  }

  // cancel
  public cancel(): void {
    this.ingredientConfirmButton = false;
    this.disableDeleteIngredientButton = false;
    this.stepConfirmButton = false;
    this.disableDeleteStepButton = false;
    this.disableMoveStepButton = false;

    this.recipeForm.patchValue({
      ingredients: this.recipe.ingredients,
      steps: this.recipe.steps,
    });
  }
}
