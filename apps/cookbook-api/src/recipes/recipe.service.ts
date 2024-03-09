import { BadRequestException, Injectable } from '@nestjs/common';
import { RecipeEntity } from './recipe.entity';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeDto } from './recipe.dto';
import { RecipeModel, UserRole } from '@cookbook/models';
import { IngredientEntity } from '../ingredients/ingredient.entity';
import { StepEntity } from '../steps/step.entity';
import { UserEntity } from '../users/user.entity';
import { DateTime } from 'luxon';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async view(recipeId: string): Promise<RecipeEntity> {
    const recipe = await this.recipeRepository.findOne({
      where: { id: recipeId },
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

  async listByUserId(userId: string): Promise<RecipeEntity[]> {
    const recipes = await this.recipeRepository.find({
      where: { userId },
      relations: ['ingredients', 'steps'],
    });
    return recipes;
  }

  async create(userId: string, body: RecipeDto): Promise<RecipeModel> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    // Check if the user has reached the quota
    if (user.role !== UserRole.Admin) {
      // number of recipes created by the user THIS MONTH
      const quota = await this.countByMonth(userId);
      if (quota >= user.quotas.recipePerMonth) {
        throw new BadRequestException(
          'Vous avez atteint votre quota de recettes pour ce mois-ci',
        );
      }
    }

    const recipe = this.recipeRepository.create({
      userId: user.id,
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
    userId: string,
    recipeId: string,
    body: RecipeDto,
  ): Promise<RecipeModel> {
    const recipe = await this.recipeRepository.findOne({
      where: { id: recipeId, userId },
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

  async delete(userId: string, recipeId: string): Promise<void> {
    try {
      await this.recipeRepository.delete({
        id: recipeId,
        userId,
      });
    } catch (error) {
      console.error(error);
    }
  }

  // count the number of recipes created by the user THIS MONTH
  async countByMonth(userId: string): Promise<number> {
    const firstDayOfMonth = DateTime.local().startOf('month').toJSDate();
    const lastDayOfMonth = DateTime.local().endOf('month').toJSDate();

    return this.recipeRepository.count({
      where: {
        userId,
        createdAt: Between(firstDayOfMonth, lastDayOfMonth),
      },
    });
  }
}
