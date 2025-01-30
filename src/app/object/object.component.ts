import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-object',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './object.component.html',
  styleUrl: './object.component.css',
})
export class ObjectComponent {}
