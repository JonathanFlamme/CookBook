import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CategoryType } from '@cookbook/models';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrl: './recipe-create.component.scss',
})
export class RecipeCreateComponent {
  public categories = Object.values(CategoryType);

  constructor(private fb: FormBuilder) {}

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get steps(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }

  public recipeForm = this.fb.group({
    title: this.fb.control<string>('', Validators.required),
    duration: this.fb.control<string>('', Validators.required),
    categories: this.fb.control<CategoryType[]>([], Validators.required),
    ingredients: this.fb.array([]),
    steps: this.fb.array([]),
  });

  public submit() {
    console.log(this.recipeForm.value);
  }

  addIngredient() {
    this.ingredients.push(
      this.fb.group({
        name: this.fb.control<string>('', Validators.required),
        quantity: this.fb.control<string>('', Validators.required),
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
}
