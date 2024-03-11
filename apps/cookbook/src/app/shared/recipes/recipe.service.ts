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

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

  public view(recipeId: string): Observable<RecipeModel> {
    return this.http.get<RecipeModel>(`${this.baseUrl}/recipes/${recipeId}`, {
      withCredentials: true,
    });
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

  public listByUserId(): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>(`${this.baseUrl}/my-recipes`, {
      withCredentials: true,
    });
  }

  public create(
    title: string,
    duration: string,
    ingredients: { name: string; quantity: string; unit: UnitList }[],
    steps: { description: string; sort: number }[],
    categories: CategoryType[],
  ): Observable<RecipeModel> {
    return this.http.post<RecipeModel>(
      `${this.baseUrl}/recipes`,
      {
        title,
        duration,
        ingredients,
        steps,
        categories,
      },
      { withCredentials: true },
    );
  }

  public update(
    recipeId: string,
    title: string,
    duration: string,
    ingredients: { name: string; quantity: string; unit: UnitList }[],
    steps: { description: string; sort: number }[],
    categories: CategoryType[],
  ): Observable<RecipeModel> {
    return this.http.patch<RecipeModel>(
      `${this.baseUrl}/recipes/${recipeId}`,
      {
        title,
        duration,
        ingredients,
        steps,
        categories,
      },
      { withCredentials: true },
    );
  }

  public delete(recipeId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/recipes/${recipeId}`, {
      withCredentials: true,
    });
  }

  /**
   * Count recipe by month
   */
  public count(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/recipes`, {
      withCredentials: true,
    });
  }
}
