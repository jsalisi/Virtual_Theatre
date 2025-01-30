import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  imageFile: File | any = null;
  baseUrl: string = 'http://localhost:8000';

  constructor(private httpClient: HttpClient) {}

  uploadFileData(event: any) {
    this.imageFile = event.target.files[0];

    const fd = new FormData();
    fd.append('file', this.imageFile);
    return this.httpClient.post(`${this.baseUrl}/api/upload`, fd);
  }
}
