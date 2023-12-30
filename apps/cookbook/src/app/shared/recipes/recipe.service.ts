import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryType, RecipeModel } from '@cookbook/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

  public create(
    title: string,
    duration: string,
    ingredients: { name: string; quantity: string }[],
    steps: { description: string }[],
    categories: CategoryType,
  ): Observable<RecipeModel> {
    return this.http.post<RecipeModel>(`${this.baseUrl}/recipes`, {
      title,
      duration,
      ingredients,
      steps,
      categories,
    });
  }
}
