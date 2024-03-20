import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StepModel } from '@cookbook/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  private baseUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

  public update(
    recipeId: string,
    steps: { description: string; sort: number }[],
  ): Observable<StepModel[]> {
    return this.http.patch<StepModel[]>(
      `${this.baseUrl}/recipes/${recipeId}/steps`,
      steps,
    );
  }

  public delete(recipeId: string, stepId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/recipes/${recipeId}/steps/${stepId}`,
    );
  }
}
