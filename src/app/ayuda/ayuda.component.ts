import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Validators added for form validation



@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent {
  // Form variables
  signInForm: FormGroup;


  getLoggedInUser() {
    return this.authService.currentUser ? this.authService.currentUser.displayName : 'No user logged in';
  }


  constructor(private fb: FormBuilder, public authService: AuthService) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Changed to 'email'
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

}
