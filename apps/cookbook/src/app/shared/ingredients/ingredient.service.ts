import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private baseUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

  public delete(ingredientId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/ingredients/${ingredientId}`,
    );
  }
}
