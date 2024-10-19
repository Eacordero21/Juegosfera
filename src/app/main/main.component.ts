import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Validators added for form validation
import { DataService } from '../services/data.service';  // Ensure correct path to DataService
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  // Form variables
  signInForm: FormGroup;

  // Slideshow variables
  currentSlide: number = 0;
  slides: number[] = [0, 1, 2];

  getLoggedInUser() {
    return this.authService.currentUser ? this.authService.currentUser.displayName : 'No user logged in';
  }


  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Changed to 'email'
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Slideshow logic
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }
}
