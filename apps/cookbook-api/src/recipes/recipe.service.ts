import { Injectable } from '@nestjs/common';
import { RecipeEntity } from './recipe.entity';

@Injectable()
export class RecipeService {
  constructor() {}

  async create(body: RecipeEntity): Promise<RecipeEntity> {
    console.log('body', body);
    return body;
  }
}
