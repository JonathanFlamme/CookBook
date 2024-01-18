import { Injectable } from '@nestjs/common';
import { RecipeEntity } from './recipe.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeDto } from './recipe.dto';
import { RecipeModel } from '@cookbook/models';
import { IngredientEntity } from '../ingredients/ingredient.entity';
import { StepEntity } from '../steps/step.entity';
import { Request as RequestType } from 'express';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
  ) {}

  async view(req: RequestType, recipeId: string): Promise<RecipeEntity> {
    const recipe = await this.recipeRepository.findOne({
      where: { id: recipeId, userId: req.user['userId'] },
      relations: ['ingredients', 'steps'],
      order: { steps: { sort: 'ASC' } },
    });
    return recipe;
  }

  async list(): Promise<RecipeEntity[]> {
    const recipes = await this.recipeRepository.find({
      relations: ['ingredients', 'steps'],
    });
    return recipes;
  }

  async create(req: RequestType, body: RecipeDto): Promise<RecipeModel> {
    const recipe = this.recipeRepository.create({
      userId: req.user['userId'],
      title: body.title,
      duration: body.duration,
      categories: body.categories,
      ingredients: body.ingredients,
      steps: body.steps,
    });

    try {
      await this.recipeRepository.save(recipe);
    } catch (error) {
      console.error(error);
    }

    return recipe;
  }

  async update(
    req: RequestType,
    recipeId: string,
    body: RecipeDto,
  ): Promise<RecipeModel> {
    const recipe = await this.recipeRepository.findOne({
      where: { id: recipeId, userId: req.user['userId'] },
      relations: ['ingredients', 'steps'],
    });
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    // update ingredients or create new ones
    const ingredients = body.ingredients.map((ingredient, index) => {
      // if the ingredient already exists, update it
      if (recipe.ingredients[index]) {
        recipe.ingredients[index].name = ingredient.name;
        recipe.ingredients[index].quantity = ingredient.quantity;
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

    // update steps or create new ones
    const steps = body.steps.map((step, index) => {
      // if the step already exists, update it
      if (recipe.steps[index]) {
        recipe.steps[index].description = step.description;
        recipe.steps[index].sort = step.sort;
        return recipe.steps[index];
      }
      // if the step doesn't exist, create it
      if (!recipe.steps[index]) {
        const newStep = new StepEntity();
        newStep.description = step.description;
        newStep.sort = step.sort;
        return newStep;
      }
    });

    recipe.title = body.title;
    recipe.duration = body.duration;
    recipe.categories = body.categories;
    recipe.ingredients = ingredients;
    recipe.steps = steps;

    try {
      await this.recipeRepository.save(recipe);
    } catch (error) {
      console.error(error);
    }

    return recipe;
  }

  async delete(req: RequestType, recipeId: string): Promise<void> {
    try {
      await this.recipeRepository.delete({
        id: recipeId,
        userId: req.user['userId'],
      });
    } catch (error) {
      console.error(error);
    }
  }
}
