import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StepModel } from '@cookbook/models';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  private baseUrl = environment.flamsUrl;

  constructor(private readonly http: HttpClient) {}

  public update(
    slug: string,
    steps: { description: string; sort: number }[],
  ): Observable<StepModel[]> {
    return this.http.patch<StepModel[]>(
      `${this.baseUrl}/recipes/${slug}/steps`,
      steps,
    );
  }

  public delete(slug: string, stepId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/recipes/${slug}/steps/${stepId}`,
    );
  }
}
