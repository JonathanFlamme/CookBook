import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeModel } from '@cookbook/models';
import { Observable } from 'rxjs';

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

  public list(): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>(`${this.baseUrl}/recipes`);
  }
}
