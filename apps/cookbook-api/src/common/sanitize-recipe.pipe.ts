import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import sanitizeHtml from 'sanitize-html';
import { RecipeDto } from '../recipes/recipe.dto';
@Injectable()
export class SanitizerRecipePipe implements PipeTransform<unknown> {
  transform(value: RecipeDto, metadata: ArgumentMetadata): RecipeDto {
    if (metadata.type !== 'body') {
      return value;
    }

    //sanitize recipe title and duration
    if (typeof value.title === 'string' && value.title.trim() !== '') {
      value.title = sanitizeHtml(value.title);
    }
    if (typeof value.duration === 'string' && value.duration.trim() !== '') {
      value.duration = sanitizeHtml(value.duration);
    }

    // Sanitizer each ingredient
    if (value.ingredients && Array.isArray(value.ingredients)) {
      value.ingredients.forEach((ingredient) => {
        if (
          typeof ingredient.name === 'string' &&
          ingredient.name.trim() !== ''
        ) {
          ingredient.name = sanitizeHtml(ingredient.name);
        }
        if (
          typeof ingredient.quantity === 'string' &&
          ingredient.quantity.trim() !== ''
        ) {
          ingredient.quantity = sanitizeHtml(ingredient.quantity);
        }
      });
    }

    // Sanitizer each step
    if (value.steps && Array.isArray(value.steps)) {
      value.steps.forEach((step) => {
        if (
          typeof step.description === 'string' &&
          step.description.trim() !== ''
        ) {
          step.description = sanitizeHtml(step.description);
        }
      });
    }

    return value;
  }
}
