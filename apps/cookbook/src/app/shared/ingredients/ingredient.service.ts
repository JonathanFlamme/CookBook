import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IngredientModel, UnitList } from '@cookbook/models';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private baseUrl = environment.flamsUrl;

  constructor(private readonly http: HttpClient) {}

  public update(
    recipeId: string,
    ingredient: { name: string; quantity: string; unit: UnitList }[],
  ): Observable<IngredientModel[]> {
    return this.http.patch<IngredientModel[]>(
      `${this.baseUrl}/recipes/${recipeId}/ingredients`,
      ingredient,
    );
  }

  public delete(recipeId: string, ingredientId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/recipes/${recipeId}/ingredients/${ingredientId}`,
    );
  }
}
