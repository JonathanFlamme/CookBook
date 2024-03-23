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
import { Exclude } from 'class-transformer';

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

  @Exclude()
  @Column({ type: 'json', nullable: true })
  emailToken: { token: string; expiredAt: Date };

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'timestamp', nullable: true })
  verifiedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => RecipeEntity, (recipe) => recipe.user, {
    onDelete: 'CASCADE',
  })
  recipes: RecipeEntity[];
}
