import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app/app.service';
import { RecipesModule } from './recipes/recipes.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { StepsModule } from './steps/steps.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    RecipesModule,
    IngredientsModule,
    StepsModule,
    CategoriesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
