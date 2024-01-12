import { Module } from '@nestjs/common';
import databaseConfig from '../orm/config';

import { AppController } from './app.controller';
import { AppService } from './app/app.service';
import { RecipesModule } from './recipes/recipes.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { StepsModule } from './steps/steps.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    RecipesModule,
    IngredientsModule,
    StepsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
