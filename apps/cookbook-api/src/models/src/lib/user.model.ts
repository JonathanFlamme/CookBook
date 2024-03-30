import { RecipeModel } from './recipe.model';

export interface UserModel {
  id: string;
  role: UserRole;
  givenName: string;
  familyName: string;
  quotas: UserQuotas;
  email: string;
  password: string;
  recipes: RecipeModel[];
  createdAt: Date;
  updatedAt: Date;
  verifiedAt: Date;
}

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export interface UserQuotas {
  recipePerMonth: number;
}

export interface UserRequest {
  userId: string;
  role: string;
}
