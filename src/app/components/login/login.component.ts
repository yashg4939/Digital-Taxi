import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';  // Import FormsModule for standalone component
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,  // Mark this as a standalone component
  imports: [FormsModule],  // Import FormsModule for the standalone component
})
export class LoginComponent {
  constructor(private _router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Login successful:', form.value);
    } else {
      console.log('Form is invalid');
    }
  }

  register() {
   var exec = this._router.navigate(['./registration']);
   console.log(exec);


  }
}
