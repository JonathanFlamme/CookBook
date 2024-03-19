import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import sanitizeHtml from 'sanitize-html';
import { StepDto } from '../steps/step.dto';
@Injectable()
export class SanitizerStepPipe implements PipeTransform<unknown> {
  transform(values: StepDto[], metadata: ArgumentMetadata): StepDto[] {
    if (metadata.type !== 'body') {
      return values;
    }

    if (!values || typeof values !== 'object') {
      return values;
    }

    // Sanitize the description of each step
    values.forEach((value: StepDto) => {
      if (
        typeof value.description === 'string' &&
        value.description.trim() !== ''
      ) {
        value.description = sanitizeHtml(value.description);
      }
    });

    return values;
  }
}
