import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipes/recipe.service';
import { RecipeModel } from '@cookbook/models';

@Component({
  selector: 'app-my-recipes-list',

  templateUrl: './my-recipes-list.component.html',
  styleUrl: './my-recipes-list.component.scss',
})
export class MyRecipesListComponent implements OnInit {
  constructor(private readonly recipeService: RecipeService) {}

  public recipes: RecipeModel[] = [];

  ngOnInit(): void {
    this.recipeService.listByUserId().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
