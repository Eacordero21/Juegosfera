import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  userRole$: Observable<string | null>;

  constructor(public authService: AuthService) {
    this.userRole$ = this.authService.userRole.asObservable(); // Subscribe to the role changes
  }

  ngOnInit() {
    // Any other initialization logic
  }
}
