import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import sanitizeHtml from 'sanitize-html';
import { IngredientDto } from '../ingredients/ingredient.dto';
@Injectable()
export class SanitizerIngredientPipe implements PipeTransform<unknown> {
  transform(
    values: IngredientDto[],
    metadata: ArgumentMetadata,
  ): IngredientDto[] {
    if (metadata.type !== 'body') {
      return values;
    }

    if (!values || !Array.isArray(values)) {
      return values;
    }

    // Sanitize the 'name' field of each ingredient
    values.forEach((value: IngredientDto) => {
      if (
        (typeof value.name === 'string' && value.name.trim() !== '') ||
        (typeof value.quantity === 'string' && value.name.trim() !== '')
      ) {
        if (typeof value.name === 'string') {
          value.name = sanitizeHtml(value.name);
        }
        if (typeof value.quantity === 'string') {
          value.quantity = sanitizeHtml(value.quantity);
        }
      }
    });

    return values;
  }
}
