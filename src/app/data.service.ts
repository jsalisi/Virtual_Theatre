import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  imageFile: File | any = null;
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  uploadFileData(event: any) {
    this.imageFile = event.target.files[0];

    const fd = new FormData();
    fd.append('file', this.imageFile);
    return this.httpClient.post(`${this.baseUrl}/api/upload`, fd);
  }
}
