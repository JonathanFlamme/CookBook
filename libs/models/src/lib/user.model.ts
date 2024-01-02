import { RecipeModel } from './recipe.model';

export interface UserModel {
  id: string;
  role: UserRole;
  givenName: string;
  familyName: string;
  email: string;
  password: string;
  recipes: RecipeModel[];
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}
