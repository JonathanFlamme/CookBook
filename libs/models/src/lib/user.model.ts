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

export enum UserIdTemporaly {
  UserId = '3adf32aa-ae4b-4507-9b97-b1caacf15378',
}

export interface UserRequest {
  userId: string;
  role: string;
}
