import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeModel } from '@cookbook/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

  public create(recipe: Partial<RecipeModel>): Observable<RecipeModel> {
    return this.http.post<RecipeModel>(`${this.baseUrl}/recipes`, {
      recipe,
    });
  }
}
