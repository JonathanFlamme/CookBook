import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserModel, UserQuotas, UserRole } from '@cookbook/models';
import { RecipeEntity } from '../recipes/recipe.entity';

@Entity({ name: 'user' })
export class UserEntity implements UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role: UserRole;

  @Column({ type: 'text' })
  givenName: string;

  @Column({ type: 'text' })
  familyName: string;

  @Column('jsonb', { default: { recipePerMonth: 5 } })
  quotas: UserQuotas;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => RecipeEntity, (recipe) => recipe.user, {
    onDelete: 'CASCADE',
  })
  recipes: RecipeEntity[];
}
