import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.css']
})
export class DescripcionComponent implements OnInit {
  product: any;
  errorMessage: string | null = null;
  activeTab: string = 'especificaciones';
  reviews$!: Observable<any[]>;

  // Define newReview as an object with comment and rating properties
  newReview = {
    comment: '',
    rating: 1 // default rating
  };

  products = [
    { id: 1, name: 'Juego 1', sku: 'WH1000XM4', description: 'Juego de aventura épico con gráficos impresionantes.', price: 1, image: '/assets/Portada truth1.png', downloadLink: 'https://example.com/download/juego1', features: ['Inmersión total', 'Multijugador', 'Alta resolución'] },
    { id: 2, name: 'Juego 2', sku: 'WH2000AB1', description: 'Juego de carreras con físicas realistas y gráficos en 3D.', price: 1, image: '/assets/WhatsApp Image 2024-10-22 at 12.40.02 PM.jpeg', downloadLink: 'https://example.com/download/juego1', features: ['Competencias online', 'Alta velocidad', 'Multijugador'] },
    { id: 3, name: 'Juego 3', sku: 'WH3000XT3', description: 'Juego de estrategia por turnos con un mapa enorme y gran detalle.', price: 1, image: '/assets/WhatsApp Image 2024-10-22 at 12.44.43 PM.jpeg', downloadLink: 'https://example.com/download/juego1', features: ['Modo historia', 'Multijugador', 'Expansión de mundo'] },
    { id: 4, name: 'Juego 4', sku: 'WH4000XT4', description: 'Juego de estrategia por turnos con un mapa enorme y gran detalle.', price: 1, image: '/assets/WhatsApp Image 2024-10-22 at 12.44.43 PM.jpeg', downloadLink: 'https://example.com/download/juego1', features: ['Modo historia', 'Multijugador', 'Expansión de mundo'] },
    { id: 5, name: 'Juego 5', sku: 'WH5000XT5', description: 'Juego de estrategia por turnos con un mapa enorme y gran detalle.', price: 1, image: '/assets/WhatsApp Image 2024-10-22 at 12.44.43 PM.jpeg', downloadLink: 'https://example.com/download/juego1', features: ['Modo historia', 'Multijugador', 'Expansión de mundo'] },
    { id: 6, name: 'Juego 6', sku: 'WH6000XT6', description: 'Juego de estrategia por turnos con un mapa enorme y gran detalle.', price: 1, image: '/assets/WhatsApp Image 2024-10-22 at 12.44.43 PM.jpeg', downloadLink: 'https://example.com/download/juego1', features: ['Modo historia', 'Multijugador', 'Expansión de mundo'] },
    { id: 7, name: 'Juego 7', sku: 'WH7000XT7', description: 'Juego de estrategia por turnos con un mapa enorme y gran detalle.', price: 1, image: '/assets/WhatsApp Image 2024-10-22 at 12.44.43 PM.jpeg', downloadLink: 'https://example.com/download/juego1', features: ['Modo historia', 'Multijugador', 'Expansión de mundo'] },
    { id: 8, name: 'Juego 8', sku: 'WH8000XT8', description: 'Juego de estrategia por turnos con un mapa enorme y gran detalle.', price: 1, image: '/assets/WhatsApp Image 2024-10-22 at 12.44.43 PM.jpeg', downloadLink: 'https://example.com/download/juego1', features: ['Modo historia', 'Multijugador', 'Expansión de mundo'] }
  ];

  constructor(
    private route: ActivatedRoute, 
    public authService: AuthService,
    private cartService: CartService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find(p => p.id === productId);
    
    if (!this.product) {
      this.errorMessage = 'Producto no encontrado.';
    } else {
      this.errorMessage = null;
      this.loadReviews(productId); // Load reviews for this product
    }
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      alert(`${this.product.name} ha sido añadido al carrito.`);
    } else {
      alert('Producto no disponible.');
    }
  }
  
  getLoggedInUser() {
    return this.authService.currentUser ? this.authService.currentUser.displayName : 'No user logged in';
  }

  loadReviews(productId: number) {
    this.reviews$ = this.firestore.collection('reviews', ref => 
      ref.where('gameId', '==', productId).orderBy('timestamp', 'desc')
    ).valueChanges();
  }

  addReview() {
    if (!this.newReview.comment.trim()) return; // Prevent empty reviews

    const review = {
      gameId: this.product.id,
      userId: this.authService.currentUser?.uid,
      username: this.authService.currentUser?.displayName || 'Anon',
      comment: this.newReview.comment,
      rating: this.newReview.rating, // Include rating in the review
      timestamp: new Date()
    };

    this.firestore.collection('reviews').add(review).then(() => {
      this.newReview.comment = ''; // Clear the comment after submission
      this.newReview.rating = 1; // Reset rating after submission
    });
  }
}
