import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  // ---------   UPDATE INGREDIENTS   --------- //
  async update(
    userId: string,
    recipeId: string,
    body: IngredientDto[],
  ): Promise<IngredientEntity[]> {
    const recipe = await this.recipeRepository.findOne({
      where: { id: recipeId, userId },
      relations: ['ingredients', 'steps'],
    });
    if (!recipe) {
      throw new NotFoundException("La recette n'a pas été trouvée");
    }

    const ingredients = body.map((ingredient, index) => {
      // if the ingredient already exists, update it
      if (recipe.ingredients[index]) {
        recipe.ingredients[index].name = ingredient.name;
        recipe.ingredients[index].quantity = ingredient.quantity;
        recipe.ingredients[index].unit = ingredient.unit;
        return recipe.ingredients[index];
      }
      // if the ingredient doesn't exist, create it
      if (!recipe.ingredients[index]) {
        const newIngredient = new IngredientEntity();
        newIngredient.name = ingredient.name;
        newIngredient.quantity = ingredient.quantity;
        newIngredient.unit = ingredient.unit;
        return newIngredient;
      }
    });

    recipe.ingredients = ingredients;

    try {
      await this.recipeRepository.save(recipe);
    } catch (error) {
      throw new Error("Les ingrédients de la recette n'ont pas été mis à jour");
    }
    return ingredients;
  }

  // ---------   DELETE INGREDIENT   --------- //
  async delete(
    userId: string,
    recipeId: string,
    ingredientId: string,
  ): Promise<void> {
    const recipe = await this.recipeRepository.findOne({
      where: { id: recipeId, userId },
    });
    if (!recipe) {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à supprimer cet ingrédient",
      );
    }
    const ingredient = await this.ingredientRepository.findOne({
      where: { id: ingredientId, recipeId: recipe.id },
    });
    if (!ingredient) {
      throw new NotFoundException("L'ingrédient n'a pas été trouvé");
    }
    try {
      await this.ingredientRepository.delete({ id: ingredientId });
    } catch (error) {
      throw new Error("L'ingrédient n'a pas été supprimé");
    }
  }
}
