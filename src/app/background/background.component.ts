import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataService } from '../data.service';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background.component.html',
  styleUrl: './background.component.css',
})
export class BackgroundComponent {
  backgroundUrl: string | any = null;

  constructor(private dataService: DataService) {}

  uploadBackgroundImage(event: any) {
    this.dataService.uploadFileData(event).subscribe((res) => {
      this.backgroundUrl = res;
    });
  }
}
