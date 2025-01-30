import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DataService } from '../data.service';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  templateUrl: './background.component.html',
  styleUrl: './background.component.css',
})
export class BackgroundComponent {
  backgroundUrl: string | any = null;

  constructor(private dataService: DataService) {
    this.backgroundUrl = this.dataService.getData();
  }
}
