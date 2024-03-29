import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import databaseConfig from '../orm/config';

import { AppController } from './app.controller';
import { RecipesModule } from './recipes/recipes.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { StepsModule } from './steps/steps.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EmailsModule } from './email/emails.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot(databaseConfig),
    RecipesModule,
    IngredientsModule,
    StepsModule,
    UsersModule,
    AuthModule,
    EmailsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
