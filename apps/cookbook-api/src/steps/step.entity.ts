import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StepModel } from '@cookbook/models';

@Entity({ name: 'step' })
export class StepEntity implements StepModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  recipeId: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  sort: number;

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.steps, { onDelete: 'CASCADE' }
  recipe: RecipeEntity)
}
