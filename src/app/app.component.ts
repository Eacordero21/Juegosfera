import { Component } from '@angular/core';
import { AuthService } from '../app/services/auth.service';
import { signOut, Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'juegosfera';
  isOpen = false;

  constructor(public authService: AuthService, private auth: Auth) {}

  getLoggedInUser() {
    return this.authService.currentUser ? this.authService.currentUser.displayName : 'No user logged in';
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }
  
  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('User signed out');
      // Redirect to the main page after successful sign up
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
  
}
