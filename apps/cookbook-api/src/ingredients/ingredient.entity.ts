import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IngredientModel, UnitList } from '@cookbook/models';
import { RecipeEntity } from '../recipes/recipe.entity';

@Entity({ name: 'ingredient' })
export class IngredientEntity implements IngredientModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  recipeId: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  quantity: string;

  @Column({ type: 'enum', enum: UnitList, nullable: true })
  unit: UnitList;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.steps, {
    onDelete: 'CASCADE',
  })
  recipe: RecipeEntity;
}
