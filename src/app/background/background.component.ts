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
  backgroundUrl: string | any =
    'https://static.vecteezy.com/system/resources/previews/020/335/190/non_2x/modern-abstract-grid-background-template-black-and-white-square-grid-design-vector.jpg';

  constructor(private dataService: DataService) {}

  uploadBackgroundImage(event: any) {
    this.dataService.uploadFileData(event).subscribe((res) => {
      this.backgroundUrl = res;
    });
  }
}
