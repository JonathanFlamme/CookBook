import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StepModel } from '@cookbook/models';
import { RecipeEntity } from '../recipes/recipe.entity';

@Entity({ name: 'step' })
export class StepEntity implements StepModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  recipeId: string;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.steps, {
    onDelete: 'CASCADE',
  })
  recipe: RecipeEntity;
}
