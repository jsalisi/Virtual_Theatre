import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  imageFile: File | any = null;
  private baseUrl = environment.baseUrl;
  private apiKey = environment.key;
  private imageUrl = signal('');

  constructor(private httpClient: HttpClient) {}

  setData(update: string) {
    this.imageUrl.set(update);
  }

  getData() {
    return this.imageUrl;
  }

  uploadFileData(event: any) {
    this.imageFile = event.target.files[0];

    const fd = new FormData();
    fd.append('file', this.imageFile);
    return this.httpClient.post(
      `${this.baseUrl}/api/upload?api-key=${this.apiKey}`,
      fd
    );
  }
}
