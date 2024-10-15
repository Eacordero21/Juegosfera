import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Validators added for form validation
import { DataService } from '../services/data.service';  // Ensure correct path to DataService

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  // Form variables
  dataForm: FormGroup;

  // Slideshow variables
  currentSlide: number = 0;
  slides: number[] = [0, 1, 2];

  constructor(private fb: FormBuilder, private dataService: DataService) {
    // Initialize the form with validators
    this.dataForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.dataForm.valid) {
      this.dataService.addData(this.dataForm.value).then(() => {
        console.log('Data added successfully!');
        this.dataForm.reset();  // Reset the form after submission
      }).catch((error) => {
        console.error('Error adding data:', error);  // Handle submission error
      });
      
    } else {
      console.log('Form is invalid');
    }
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
