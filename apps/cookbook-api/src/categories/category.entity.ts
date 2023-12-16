import { CategoryModel, CategoryType } from '@cookbook/models';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RecipeEntity } from '../recipes/recipe.entity';

@Entity({ name: 'category' })
export class CategoryEntity implements CategoryModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  recipeId: string;

  type: CategoryType;

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.categories, {
    onDelete: 'CASCADE',
  })
  recipe: RecipeEntity;
}
