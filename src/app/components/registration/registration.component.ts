import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule for standalone component
import { RouterModule } from '@angular/router';  // Import RouterModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  standalone: true,  // Mark this as a standalone component
  imports: [FormsModule, RouterModule],  // Import FormsModule and RouterModule for the standalone component
})
export class RegistrationComponent {
  constructor(private _router: Router) {}
}
