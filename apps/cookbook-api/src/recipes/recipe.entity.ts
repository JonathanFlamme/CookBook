import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryType, RecipeModel } from '@cookbook/models';
import { StepEntity } from '../steps/step.entity';
import { IngredientEntity } from '../ingredients/ingredient.entity';
import { UserEntity } from '../users/user.entity';

@Entity({ name: 'recipe' })
export class RecipeEntity implements RecipeModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ type: 'text', nullable: true })
  imageUrl: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', unique: true, nullable: true })
  slug: string;

  @Column({ type: 'text' })
  duration: string;

  @Column({ type: 'text', array: true })
  categories: CategoryType[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.recipes, { onDelete: 'CASCADE' })
  user: UserEntity;

  @OneToMany(() => IngredientEntity, (ingredient) => ingredient.recipe, {
    cascade: true,
  })
  ingredients: IngredientEntity[];

  @OneToMany(() => StepEntity, (step) => step.recipe, {
    cascade: true,
  })
  steps: StepEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  validateCounts() {
    if (this.ingredients.length > 10) {
      throw new Error('Une recette ne peut pas avoir plus de 10 ingredients');
    }
    if (this.steps.length > 10) {
      throw new Error('Une recette ne peut pas avoir plus de 10 étapes');
    }
  }
}
