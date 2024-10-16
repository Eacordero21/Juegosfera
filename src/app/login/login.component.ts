import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  signInForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signInForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getLoggedInUser() {
    return this.authService.currentUser ? this.authService.currentUser.displayName : 'No user logged in';
  }

  async onLogout() {
    await this.authService.signOut();
    this.authService.currentUser = null; // Clear logged in user
    this.successMessage = null;
    this.errorMessage = 'You have been logged out.'; // Optional message
  }

  async onSubmit() {
    if (this.signInForm.valid) {
      this.loading = true;
      const { email, password } = this.signInForm.value;

      const { user, error } = await this.authService.signIn(email, password);
      this.loading = false;

      if (error) {
        this.successMessage = null;
        this.errorMessage = 'Invalid email or password.'; // Adjust this message as needed
      } else {
        this.successMessage = 'Login successful!';
        this.errorMessage = null;
      }
    } else {
      this.errorMessage = 'Please fill out all fields correctly.';
    }
  }
}
