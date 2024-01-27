import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import sanitizeHtml from 'sanitize-html';

@Injectable()
export class SanitizerPipe implements PipeTransform<unknown> {
  async transform(value: unknown, metadata: ArgumentMetadata) {
    const dtoInstance = plainToClass(metadata.metatype, value);
    for (const key in dtoInstance) {
      if (
        Object.prototype.hasOwnProperty.call(dtoInstance, key) &&
        typeof dtoInstance[key] === 'string'
      ) {
        dtoInstance[key] = sanitizeHtml(dtoInstance[key]);
      }
    }
    return dtoInstance;
  }
}
