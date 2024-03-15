import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseApi } from '@cookbook/models';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private apiKey = 'd7dbaac5377ab890b62de416f8384b85';

  private apiUrl = 'https://api.imgbb.com/1/upload';

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
