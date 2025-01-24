import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl: string = 'http://127.0.0.1:8000';

  constructor(private httpClient: HttpClient) {}

  get_imagedata() {
    this.httpClient.get(this.baseUrl + "/api").subscribe((res) => {
      console.log(res);
    });
  }

  get_testimage() {
    return this.httpClient.get(this.baseUrl + '/testimage');
  }

  get_randomimage() {
    return this.httpClient.get('https://picsum.photos/1920/1080');
  }
}
