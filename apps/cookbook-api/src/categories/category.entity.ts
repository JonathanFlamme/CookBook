import { CategoryType } from '@cookbook/models';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  recipeId: string;

  type: CategoryType;

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.categories, { onDelete: 'CASCADE' }
  recipe: RecipeEntity)
}
