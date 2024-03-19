import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseApi } from '@cookbook/models';
import { map } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private apiKey = environment.IMAGE_API_KEY;
  private apiUrl = environment.IMAGE_API_URL;

  constructor(private readonly http: HttpClient) {}

  public uploadImage(file: File) {
    const formData = new FormData();

    formData.append('key', this.apiKey);
    formData.append('image', file);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http
      .post<ResponseApi>(this.apiUrl, formData, {
        headers: headers,
      })
      .pipe(
        map((response) => {
          // return the url of the uploaded image
          return response.data.url;
        }),
      );
  }
}
