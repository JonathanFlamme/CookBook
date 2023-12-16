import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserModel, UserRole } from '@cookbook/models';
import { RecipeEntity } from '../recipes/recipe.entity';

@Entity({ name: 'user' })
export class UserEntity implements UserModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role: UserRole;

  @Column({ type: 'text' })
  givenName: string;

  @Column({ type: 'text' })
  familyName: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;

  @OneToMany(() => RecipeEntity, (recipe) => recipe.user, {
    onDelete: 'CASCADE',
  })
  recipes: RecipeEntity[];
}
