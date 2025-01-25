import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background.component.html',
  styleUrl: './background.component.css',
})
export class BackgroundComponent {
  imageFile: File | any = null;
  baseUrl: string = 'http://localhost:8000';
  backgroundUrl: string | any = null;

  constructor(private httpClient: HttpClient) {}

  uploadBackgroundImage(event: any) {
    this.imageFile = event.target.files[0];

    const fd = new FormData();
    fd.append('file', this.imageFile);
    this.httpClient.post(this.baseUrl + '/api/upload', fd).subscribe((res) => {
      console.log(res);
      this.backgroundUrl = res;
    });
  }
}
