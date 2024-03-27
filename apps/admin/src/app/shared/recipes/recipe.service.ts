import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CategoryType,
  PaginatedResult,
  RecipeModel,
  UnitList,
} from '@cookbook/models';
import { Observable } from 'rxjs';
import { RecipeListQuery } from './recipe-list-query';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = environment.yummyBookUrl;

  constructor(private readonly http: HttpClient) {}

  public view(recipeId: string): Observable<RecipeModel> {
    return this.http.get<RecipeModel>(`${this.baseUrl}/recipes/${recipeId}`);
  }

  public list(
    params: RecipeListQuery,
  ): Observable<PaginatedResult<RecipeModel>> {
    return this.http.get<PaginatedResult<RecipeModel>>(
      `${this.baseUrl}/recipes`,
      {
        params: {
          page: (params.page + 1 || 1).toString(),
          limit: (params.limit || 12).toString(),
          query: params.query || '',
          category: params.category || '',
          orderBy: params.orderBy || 'updatedAt',
          order: params.order || 'DESC',
        },
      },
    );
  }

  public update(
    userId: string,
    recipeId: string,
    title: string,
    duration: string,
    ingredients: { name: string; quantity: string; unit: UnitList }[],
    steps: { description: string; sort: number }[],
    categories: CategoryType[],
    imageUrl: string,
  ): Observable<RecipeModel> {
    return this.http.patch<RecipeModel>(
      `${this.baseUrl}/users/${userId}/recipes/${recipeId}`,
      {
        title,
        duration,
        ingredients,
        steps,
        categories,
        imageUrl,
      },
    );
  }

  public delete(userId: string, recipeId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/users/${userId}/recipes/${recipeId}`,
    );
  }
}
