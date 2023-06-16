import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  baseUrl: string = "http://localhost/eventum/Eventum_Angular/php";

  constructor(private http: HttpClient) { }

  uploadImage(file: File, destinationPath: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.baseUrl, formData);
  }
}
