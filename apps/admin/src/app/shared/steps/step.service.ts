import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StepModel } from '@cookbook/models';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  private baseUrl = environment.yummyBookUrl;

  constructor(private readonly http: HttpClient) {}

  public update(
    userId: string,
    recipeId: string,
    steps: { description: string; sort: number }[],
  ): Observable<StepModel[]> {
    return this.http.patch<StepModel[]>(
      `${this.baseUrl}/users/${userId}/recipes/${recipeId}/steps`,
      steps,
    );
  }

  public delete(
    userId: string,
    recipeId: string,
    stepId: string,
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/users/${userId}/recipes/${recipeId}/steps/${stepId}`,
    );
  }
}
