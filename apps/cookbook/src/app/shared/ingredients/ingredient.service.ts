import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IngredientModel } from '@cookbook/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private baseUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

  public update(
    recipeId: string,
    ingredient: { name: string; quantity: string }[],
  ): Observable<IngredientModel[]> {
    return this.http.patch<IngredientModel[]>(
      `${this.baseUrl}/recipes/${recipeId}/ingredients`,
      ingredient,
      { withCredentials: true },
    );
  }

  public delete(ingredientId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/ingredients/${ingredientId}`,
      { withCredentials: true },
    );
  }
}
