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
  private baseUrl = environment.flamsUrl;

  constructor(private readonly http: HttpClient) {}

  public view(slug: string): Observable<RecipeModel> {
    return this.http.get<RecipeModel>(`${this.baseUrl}/recipes/${slug}`);
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

  public listByUserId(
    params: RecipeListQuery,
  ): Observable<PaginatedResult<RecipeModel>> {
    return this.http.get<PaginatedResult<RecipeModel>>(
      `${this.baseUrl}/my-recipes`,
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

  public create(
    title: string,
    duration: string,
    ingredients: { name: string; quantity: string; unit: UnitList }[],
    steps: { description: string; sort: number }[],
    categories: CategoryType[],
    imageUrl: string,
  ): Observable<RecipeModel> {
    return this.http.post<RecipeModel>(`${this.baseUrl}/recipes`, {
      title,
      duration,
      ingredients,
      steps,
      categories,
      imageUrl,
    });
  }

  public update(
    slug: string,
    title: string,
    duration: string,
    ingredients: { name: string; quantity: string; unit: UnitList }[],
    steps: { description: string; sort: number }[],
    categories: CategoryType[],
    imageUrl: string,
  ): Observable<RecipeModel> {
    return this.http.patch<RecipeModel>(`${this.baseUrl}/recipes/${slug}`, {
      title,
      duration,
      ingredients,
      steps,
      categories,
      imageUrl,
    });
  }

  public delete(slug: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/recipes/${slug}`);
  }

  /**
   * Count recipe by month
   */
  public count(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/recipes`);
  }

  /**
   * Get 10 last recipes
   */
  public lastRecipes(): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>(`${this.baseUrl}/last`);
  }
}
