import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipes/recipe.service';
import { RecipeModel } from '@cookbook/models';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
})
export class RecipesListComponent implements OnInit {
  constructor(private readonly recipeService: RecipeService) {}

  public recipes: RecipeModel[] = [];

  ngOnInit(): void {
    this.recipeService.list().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
