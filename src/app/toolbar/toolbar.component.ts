import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DataService } from '../data.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  backgroundUrl: string | any = null;

  constructor(private dataService: DataService) {}

  uploadBackgroundImage(event: any): void {
    this.dataService.uploadFileData(event).subscribe((res) => {
      this.backgroundUrl = res;
      this.dataService.setData(this.backgroundUrl);
    });
  }

  @Output() onButtonPress = new EventEmitter<boolean>();
  createNewObject(pressed: boolean): void {
    this.onButtonPress.emit(pressed);
  }
}
