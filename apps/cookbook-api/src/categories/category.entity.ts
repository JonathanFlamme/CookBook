import { CategoryModel, CategoryType } from '@cookbook/models';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RecipeEntity } from '../recipes/recipe.entity';

@Entity({ name: 'category' })
export class CategoryEntity implements CategoryModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  recipeId: string;

  @Column({ type: 'enum', enum: CategoryType })
  type: CategoryType;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.categories, {
    onDelete: 'CASCADE',
  })
  recipe: RecipeEntity;
}
