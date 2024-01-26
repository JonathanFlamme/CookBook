import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { StepEntity } from './step.entity';
import { RecipeEntity } from '../recipes/recipe.entity';
import { StepDto } from './step.dto';

@Injectable()
export class StepService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,

    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,

    @InjectRepository(StepEntity)
    private readonly stepRepository: Repository<StepEntity>,
  ) {}

  async update(
    userId: string,
    recipeId: string,
    body: StepDto[],
  ): Promise<StepEntity[]> {
    const recipe = await this.recipeRepository.findOne({
      where: { id: recipeId, userId },
      relations: ['ingredients', 'steps'],
    });
    if (!recipe) {
      throw new Error('Recipe not found');
    }

    const steps = body.map((step, index) => {
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
    recipe.steps = steps;

    try {
      await this.recipeRepository.save(recipe);
    } catch (error) {
      console.error(error);
    }
    return steps;
  }

  async delete(recipeId: string, stepId: string): Promise<void> {
    //Use transaction to ensure data integrity
    await this.entityManager.transaction(async (entityManager) => {
      const recipe = await entityManager.findOne(RecipeEntity, {
        where: { id: recipeId },
        relations: ['steps'],
      });

      if (!recipe) {
        throw new Error('Recipe not found');
      }

      const stepDelete = await entityManager.findOne(StepEntity, {
        where: { id: stepId },
      });
      if (!stepDelete) {
        throw new Error('Step not found');
      }
      // reduce the sort of all steps after the deleted step by 1
      const updateSteps = recipe.steps.map((step) => {
        if (step.sort > stepDelete.sort) {
          return { ...step, sort: step.sort - 1 };
        }
        return step;
      });

      try {
        // update recipe with new steps
        await entityManager.save(RecipeEntity, {
          ...recipe,
          steps: updateSteps,
        });
        // delete step
        await entityManager.remove(StepEntity, stepDelete);
      } catch (error) {
        console.error('Transaction failed:', error);
        throw error;
      }
    });
  }
}
