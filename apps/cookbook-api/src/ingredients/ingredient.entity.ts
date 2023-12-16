import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IngredientModel } from '@cookbook/models';
import { RecipeEntity } from '../recipes/recipe.entity';

@Entity({ name: 'ingredient' })
export class IngredientEntity implements IngredientModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  recipeId: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'int' })
  quantity: string;

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.steps, {
    onDelete: 'CASCADE',
  })
  recipe: RecipeEntity;
}
