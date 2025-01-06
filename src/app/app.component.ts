import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // For common directives like `ngIf`, `ngFor`
import { RouterModule } from '@angular/router';  // For routing

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,  // Mark as standalone component
  imports: [CommonModule, RouterModule],  // Import necessary modules for routing and common directives
})
export class AppComponent {
  title = 'Your Angular App';


}
