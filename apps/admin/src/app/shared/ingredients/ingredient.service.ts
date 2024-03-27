import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IngredientModel, UnitList } from '@cookbook/models';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private baseUrl = environment.yummyBookUrl;

  constructor(private readonly http: HttpClient) {}

  public update(
    userId: string,
    recipeId: string,
    ingredient: { name: string; quantity: string; unit: UnitList }[],
  ): Observable<IngredientModel[]> {
    return this.http.patch<IngredientModel[]>(
      `${this.baseUrl}/users/${userId}/recipes/${recipeId}/ingredients`,
      ingredient,
    );
  }

  public delete(
    userId: string,
    recipeId: string,
    ingredientId: string,
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/users/${userId}/recipes/${recipeId}/ingredients/${ingredientId}`,
    );
  }
}
