import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Virtual_Theatre';

  imagePath: string =
    'https://vignette4.wikia.nocookie.net/club-penguin-rewritten/images/2/2a/Iceberg.png/revision/latest?cb=20170224125550';

  uploadBackgroundImage() {
    this.imagePath =
      'https://images.pexels.com/photos/2574997/pexels-photo-2574997.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';
  }
}
