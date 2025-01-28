import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-prop',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './prop.component.html',
  styleUrl: './prop.component.css',
})
export class PropComponent {}
