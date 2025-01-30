import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';

// Custom Components
import { BackgroundComponent } from './background/background.component';
import { ObjectComponent } from './object/object.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BackgroundComponent,
    ObjectComponent
],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
