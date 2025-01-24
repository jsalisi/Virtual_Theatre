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

  getTestImage() {
    this.httpClient.get(this.baseUrl + '/testimage').subscribe((res) => {
      this.imageFile = (res as any).background_url;
      console.log((res as any).background_url);
    });
  }

  uploadBackgroundImage(event: any) {
    this.imageFile = event.target.files[0];

    const fd = new FormData();
    fd.append('filename', this.imageFile, this.imageFile.name);
    console.log(fd);
    this.httpClient.post(this.baseUrl + '/api', fd).subscribe((res) => {
      console.log(res);
    });
  }
}
