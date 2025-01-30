import { Component, inject, ViewContainerRef } from '@angular/core';
import { ObjectComponent } from './object/object.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Virtual_Theatre';

  viewContainer = inject(ViewContainerRef);

  createObjectComponent(pressed: boolean): void {
    if (pressed) {
      this.viewContainer.createComponent(ObjectComponent);
    } else {
      console.log('No object created');      
    }
  }
}
