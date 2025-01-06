import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';  // Import RouterModule for routing
import { routes } from './app.routes';  // Import your route configuration
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterOutlet,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),  // Use RouterModule.forRoot() to configure routes
  ],
  declarations:[],
  providers: [],
})
export class AppModule {}
