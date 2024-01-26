import { Component, Input } from '@angular/core';
import { RecipeModel } from '@cookbook/models';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  @Input() public recipes: RecipeModel[] = [];
}
