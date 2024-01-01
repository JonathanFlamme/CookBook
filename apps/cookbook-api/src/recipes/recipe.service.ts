import { Injectable } from '@nestjs/common';
import { RecipeEntity } from './recipe.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeDto } from './recipe.dto';
import { CategoryEntity } from '../categories/category.entity';
import { RecipeModel } from '@cookbook/models';
import { IngredientEntity } from '../ingredients/ingredient.entity';
import { StepEntity } from '../steps/step.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
  ) {}

  public userId = 'fb48e979-bfac-467f-b899-3194719156fb';

  async view(recipeId: string): Promise<RecipeEntity> {
    const recipe = await this.recipeRepository.findOne({
      where: { id: recipeId, userId: this.userId },
      relations: ['ingredients', 'steps', 'categories'],
    });
    return recipe;
  }

  async list(): Promise<RecipeEntity[]> {
    const recipes = await this.recipeRepository.find({
      where: { userId: this.userId },
      relations: ['ingredients', 'steps', 'categories'],
    });
    return recipes;
  }

  async create(body: RecipeDto): Promise<RecipeModel> {
    const recipe = this.recipeRepository.create({
      userId: this.userId,
      title: body.title,
      duration: body.duration,
      ingredients: body.ingredients,
      steps: body.steps,
    });

    const category = new CategoryEntity();
    category.type = body.categories;
    recipe.categories = [category];

    try {
      await this.recipeRepository.save(recipe);
    } catch (error) {
      console.error(error);
    }

    return recipe;
  }

  async update(recipeId: string, body: RecipeDto): Promise<RecipeModel> {
    const recipe = await this.recipeRepository.findOne({
      where: { id: recipeId, userId: this.userId },
      relations: ['ingredients', 'steps', 'categories'],
    });
    if (!recipe) {
      throw new Error('Recipe not found');
    }

    const ingredients = body.ingredients.map((ingredient, index) => {
      if (recipe.ingredients[index]) {
        recipe.ingredients[index].name = ingredient.name;
        recipe.ingredients[index].quantity = ingredient.quantity;
        return recipe.ingredients[index];
      }
      if (!recipe.ingredients[index]) {
        const newIngredient = new IngredientEntity();
        newIngredient.name = ingredient.name;
        newIngredient.quantity = ingredient.quantity;
        return newIngredient;
      }
    });

    const steps = body.steps.map((step, index) => {
      if (recipe.steps[index]) {
        recipe.steps[index].description = step.description;
        return recipe.steps[index];
      }
      if (!recipe.steps[index]) {
        const newStep = new StepEntity();
        newStep.description = step.description;
        return newStep;
      }
    });

    recipe.title = body.title;
    recipe.duration = body.duration;
    recipe.ingredients = ingredients;
    recipe.steps = steps;
    recipe.categories[0].type = body.categories;

    try {
      await this.recipeRepository.save(recipe);
    } catch (error) {
      console.error(error);
    }

    return recipe;
  }

  async delete(recipeId: string): Promise<void> {
    try {
      await this.recipeRepository.delete({ id: recipeId, userId: this.userId });
    } catch (error) {
      console.error(error);
    }
  }
}
