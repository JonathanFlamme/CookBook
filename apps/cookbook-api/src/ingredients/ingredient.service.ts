import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientEntity } from './ingredient.entity';
import { Repository } from 'typeorm';
import { IngredientDto } from './ingredient.dto';
import { RecipeEntity } from '../recipes/recipe.entity';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(IngredientEntity)
    private readonly ingredientRepository: Repository<IngredientEntity>,

    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
  ) {}

  public userId = '6b31c1a2-ce6e-46ec-8b88-c8964f55f6ca';

  async update(
    recipeId: string,
    body: IngredientDto[],
  ): Promise<IngredientEntity[]> {
    const recipe = await this.recipeRepository.findOne({
      where: { id: recipeId, userId: this.userId },
      relations: ['ingredients', 'steps', 'categories'],
    });
    if (!recipe) {
      throw new Error('Recipe not found');
    }

    const ingredients = body.map((ingredient, index) => {
      // if the ingredient already exists, update it
      if (recipe.ingredients[index]) {
        recipe.ingredients[index].name = ingredient.name;
        recipe.ingredients[index].quantity = ingredient.quantity;
        return recipe.ingredients[index];
      }
      // if the ingredient doesn't exist, create it
      if (!recipe.ingredients[index]) {
        const newIngredient = new IngredientEntity();
        newIngredient.name = ingredient.name;
        newIngredient.quantity = ingredient.quantity;
        return newIngredient;
      }
    });

    recipe.ingredients = ingredients;

    try {
      await this.recipeRepository.save(recipe);
    } catch (error) {
      console.error(error);
    }
    return ingredients;
  }

  async delete(ingredientId: string): Promise<void> {
    await this.ingredientRepository.delete({ id: ingredientId });
  }
}
