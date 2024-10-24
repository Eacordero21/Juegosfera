import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Validators added for form validation

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.css']
})
export class DescripcionComponent implements OnInit {
  product: any;  // Aquí almacenaremos el producto actual
  
  // Form variables
  signInForm: FormGroup;


  getLoggedInUser() {
    return this.authService.currentUser ? this.authService.currentUser.displayName : 'No user logged in';
  }

  // Lista de productos (puedes obtener esto desde un servicio también)
  products = [
    { id: 1, name: 'Juego 1', sku: 'WH1000XM4', description: 'Juego de aventura épico con gráficos impresionantes.', price: 500, image: '/assets/Portada truth1.png', features: ['Inmersión total', 'Multijugador', 'Alta resolución'] },
    { id: 2, name: 'Juego 2', sku: 'WH2000AB1', description: 'Juego de carreras con físicas realistas y gráficos en 3D.', price: 350, image: '/assets/WhatsApp Image 2024-10-22 at 12.40.02 PM.jpeg', features: ['Competencias online', 'Alta velocidad', 'Multijugador'] },
    { id: 3, name: 'Juego 3', sku: 'WH3000XT3', description: 'Juego de estrategia por turnos con un mapa enorme y gran detalle.', price: 450, image: '/assets/WhatsApp Image 2024-10-22 at 12.44.43 PM.jpeg', features: ['Modo historia', 'Multijugador', 'Expansión de mundo'] },
    { id: 4, name: 'Juego 4', sku: 'WH4000XT4', description: 'Juego de estrategia por turnos con un mapa enorme y gran detalle.', price: 450, image: '/assets/WhatsApp Image 2024-10-22 at 12.44.43 PM.jpeg', features: ['Modo historia', 'Multijugador', 'Expansión de mundo'] },
    { id: 5, name: 'Juego 5', sku: 'WH5000XT5', description: 'Juego de estrategia por turnos con un mapa enorme y gran detalle.', price: 450, image: '/assets/WhatsApp Image 2024-10-22 at 12.44.43 PM.jpeg', features: ['Modo historia', 'Multijugador', 'Expansión de mundo'] },
    { id: 6, name: 'Juego 6', sku: 'WH6000XT6', description: 'Juego de estrategia por turnos con un mapa enorme y gran detalle.', price: 450, image: '/assets/WhatsApp Image 2024-10-22 at 12.44.43 PM.jpeg', features: ['Modo historia', 'Multijugador', 'Expansión de mundo'] },
    { id: 7, name: 'Juego 7', sku: 'WH7000XT7', description: 'Juego de estrategia por turnos con un mapa enorme y gran detalle.', price: 450, image: '/assets/WhatsApp Image 2024-10-22 at 12.44.43 PM.jpeg', features: ['Modo historia', 'Multijugador', 'Expansión de mundo'] },
    { id: 8, name: 'Juego 8', sku: 'WH8000XT8', description: 'Juego de estrategia por turnos con un mapa enorme y gran detalle.', price: 450, image: '/assets/WhatsApp Image 2024-10-22 at 12.44.43 PM.jpeg', features: ['Modo historia', 'Multijugador', 'Expansión de mundo'] }
  ];

  constructor(private route: ActivatedRoute, private fb: FormBuilder, public authService: AuthService) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Changed to 'email'
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
   }

  ngOnInit(): void {
    // Capturar el id de la URL
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    
    // Buscar el producto con el id correspondiente
    this.product = this.products.find(p => p.id === productId);
  }
}

