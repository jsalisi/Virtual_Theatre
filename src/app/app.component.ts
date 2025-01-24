import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Virtual_Theatre';
  imageFile: File | any = null;
  baseUrl: string = 'http://localhost:8000';

  constructor(private httpClient: HttpClient) {}

  getImageData() {
    this.httpClient.get(this.baseUrl + '/api').subscribe((res) => {
      console.log(res);
    });
  }

  uploadBackgroundImage(event: any) {
    this.imageFile = event.target.files[0];

    const fd = new FormData();
    fd.append("file", this.imageFile);
    this.httpClient.post(this.baseUrl + '/api/upload', fd).subscribe((res) => {
      console.log(res);
    });
  }
}
