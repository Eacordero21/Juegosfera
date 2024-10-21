import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  signUpForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading: boolean = false;

  constructor(private fb: FormBuilder, public authService: AuthService) {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  async onGoogleSignIn() {
    const { user, error } = await this.authService.signInWithGoogle();
    
    if (error) {
      console.error('Google sign-in error:', error);
    } else {
      console.log('Google sign-in successful:', user);
    }
  }
  

  async onSignUp() {
    if (this.signUpForm.valid) {
      this.loading = true;
      this.errorMessage = null;
      this.successMessage = null;

      const { username, email, password } = this.signUpForm.value;
      try {
        await this.authService.signUp(email, password, username);
        this.successMessage = 'Registration successful!';
        this.signUpForm.reset();
      } catch (error) {
        this.errorMessage = 'Error during registration: '; // Provide error message
      } finally {
        this.loading = false;
      }
    } else {
      console.log("Form is invalid");
    }
  }
}
