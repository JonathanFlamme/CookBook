import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResult, RecipeModel } from '@cookbook/models';
import { Observable } from 'rxjs';
import { RecipeListQuery } from './recipe-list-query';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = 'http://localhost:3000/admin';

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

  public delete(userId: string, recipeId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/users/${userId}/recipes/${recipeId}`,
      {
        withCredentials: true,
      },
    );
  }
}
