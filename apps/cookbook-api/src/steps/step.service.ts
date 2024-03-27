import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  // ---------   UPDATE STEPS   --------- //
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
      throw new NotFoundException("La recette n'a pas été trouvée");
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
      throw new Error("Les étapes de la recette n'ont pas été mises à jour");
    }
    return steps;
  }

  // ---------   DELETE STEP   --------- //
  async delete(
    userId: string,
    recipeId: string,
    stepId: string,
  ): Promise<void> {
    //Use transaction to ensure that all operations are successful
    await this.entityManager.transaction(async (entityManager) => {
      const recipe = await entityManager.findOne(RecipeEntity, {
        where: {
          id: recipeId,
          userId,
        },
        relations: ['steps'],
      });

      if (!recipe) {
        throw new UnauthorizedException(
          "Vous n'êtes pas autorisé à supprimer cette étape",
        );
      }
      const stepDelete = await entityManager.findOne(StepEntity, {
        where: { id: stepId, recipeId: recipe.id },
      });
      if (!stepDelete) {
        throw new NotFoundException("L'étape n'a pas été trouvée");
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
        throw new Error("L'étape n'a pas été supprimée");
      }
    });
  }
}
