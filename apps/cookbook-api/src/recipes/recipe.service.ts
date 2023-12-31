import { Injectable } from '@nestjs/common';
import { RecipeEntity } from './recipe.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeDto } from './recipe.dto';
import { CategoryEntity } from '../categories/category.entity';
import { RecipeModel } from '@cookbook/models';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
  ) {}

  public userId = 'd62318c5-1344-4b05-895d-27ec5fb115c2';

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

    await this.recipeRepository.save(recipe);
    return recipe;
  }

  async delete(recipeId: string): Promise<void> {
    await this.recipeRepository.delete({ id: recipeId, userId: this.userId });
  }
}