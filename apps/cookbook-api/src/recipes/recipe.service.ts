import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RecipeEntity } from './recipe.entity';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeDto } from './recipe.dto';
import { PaginatedResult, RecipeModel, UserRole } from '@cookbook/models';
import { IngredientEntity } from '../ingredients/ingredient.entity';
import { StepEntity } from '../steps/step.entity';
import { UserEntity } from '../users/user.entity';
import { DateTime } from 'luxon';
import { RecipesListDto } from './recipes-list.dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // ---------   VIEW A RECIPE   --------- //
  async view(slug: string): Promise<RecipeEntity> {
    const recipe = await this.recipeRepository.findOne({
      where: { slug },
      relations: ['ingredients', 'steps'],
      order: { steps: { sort: 'ASC' } },
    });
    if (!recipe) {
      throw new NotFoundException("La recette n'a pas été trouvée");
    }
    return recipe;
  }

  // ---------   LIST ALL RECIPES FOR ADMIN   --------- //
  async listForAdmin(): Promise<RecipeEntity[]> {
    const recipes = await this.recipeRepository.find();
    return recipes;
  }

  // ---------   LIST ALL RECIPES   --------- //
  async list(query: RecipesListDto): Promise<PaginatedResult<RecipeEntity>> {
    const queryBuilder = this.recipeRepository
      .createQueryBuilder('recipe')
      .select(['recipe', 'user.givenName', 'user.familyName'])
      .leftJoin('recipe.user', 'user');

    if (query.query) {
      queryBuilder.where("LOWER(recipe.title || '' ) LIKE LOWER(:query)", {
        query: `%${query.query}%`,
      });
    }

    if (query.category) {
      queryBuilder.andWhere(`:category = ANY(recipe.categories)`, {
        category: query.category,
      });
    }

    const [items, count] = await queryBuilder
      .skip((query.page - 1) * query.limit)
      .take(query.limit)
      .orderBy(`recipe.${query.orderBy}`, query.order)
      .getManyAndCount();

    return { items, count };
  }

  // ---------   LIST ALL RECIPES BY USER ID   --------- //
  async listByUserId(
    query: RecipesListDto,
    userId: string,
  ): Promise<PaginatedResult<RecipeEntity>> {
    const queryBuilder = this.recipeRepository
      .createQueryBuilder('recipe')
      .select(['recipe'])
      .where('recipe.userId = :userId', { userId: userId });

    if (query.query) {
      queryBuilder.where("LOWER(recipe.title || '' ) LIKE LOWER(:query)", {
        query: `%${query.query}%`,
      });
    }

    if (query.category) {
      queryBuilder.andWhere(`:category = ANY(recipe.categories)`, {
        category: query.category,
      });
    }

    const [items, count] = await queryBuilder
      .skip((query.page - 1) * query.limit)
      .take(query.limit)
      .orderBy(`recipe.${query.orderBy}`, query.order)
      .getManyAndCount();

    return { items, count };
  }

  // ---------   CREATE A NEW RECIPE   --------- //
  async create(userId: string, body: RecipeDto): Promise<RecipeModel> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new UnauthorizedException("L'utilisateur n'a pas été trouvé");
    }

    // Check if the user has reached the quota
    if (user.role !== UserRole.Admin) {
      // number of recipes created by the user THIS MONTH
      const quota = await this.countByMonth(userId);
      if (quota >= user.quotas.recipePerMonth) {
        throw new BadRequestException(
          `Vous ne pouvez pas ajouter plus de ${quota} recette(s) ce mois-ci`,
        );
      }
    }

    const slug = body.title.trim().toLowerCase().replace(/\s+/g, '-');

    const recipe = this.recipeRepository.create({
      userId: user.id,
      title: body.title,
      slug,
      duration: body.duration,
      categories: body.categories,
      ingredients: body.ingredients,
      steps: body.steps,
      imageUrl: body.imageUrl,
    });

    try {
      await this.recipeRepository.save(recipe);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('La recette existe déjà');
      }
      throw new Error(
        'Une erreur est survenue lors de la création de la recette',
      );
    }

    return recipe;
  }

  // ---------   UPDATE A RECIPE   --------- //
  async update(
    userId: string,
    slug: string,
    body: RecipeDto,
  ): Promise<RecipeModel> {
    const recipe = await this.recipeRepository.findOne({
      where: { slug, userId },
      relations: ['ingredients', 'steps'],
    });
    if (!recipe) {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à modifier cette recette",
      );
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
    recipe.slug = body.title.trim().toLowerCase().replace(/\s+/g, '-');
    recipe.duration = body.duration;
    recipe.categories = body.categories;
    recipe.imageUrl = body.imageUrl;
    recipe.ingredients = ingredients;
    recipe.steps = steps;

    try {
      await this.recipeRepository.save(recipe);
    } catch (error) {
      throw new Error(
        'Une erreur est survenue lors de la mise à jour de la recette',
      );
    }

    return recipe;
  }

  // ---------   DELETE A RECIPE   --------- //
  async delete(userId: string, slug: string): Promise<void> {
    const recipe = await this.recipeRepository.findOne({
      where: { slug, userId },
    });
    if (!recipe) {
      throw new NotFoundException("La recette n'a pas été trouvée");
    }
    try {
      await this.recipeRepository.delete({
        slug,
        userId,
      });
    } catch (error) {
      throw new Error(
        'Une erreur est survenue lors de la suppression de la recette',
      );
    }
  }

  // ---------   COUNT RECIPES CREATED BY USER THIS MONTH   --------- //
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

  // ---------   GET LAST 10 RECIPES  --------- //
  async lastRecipes(): Promise<RecipeEntity[]> {
    return this.recipeRepository.find({
      order: { createdAt: 'DESC' },
      take: 10,
    });
  }
}
