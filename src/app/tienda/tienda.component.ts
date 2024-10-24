import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {
  userRole$: Observable<string | null>;

  constructor(public authService: AuthService) {
    this.userRole$ = this.authService.userRole.asObservable(); // Subscribe to the role changes
  }

  searchQuery: string = '';
  order: string = 'default';

  products = [
    { id: 1, name: 'Juego 1', category: 'videojuegos', price: 500, image: '/assets/Portada truth1.png' },
    { id: 2, name: 'Juego 2', category: 'videojuegos', price: 350, image: '/assets/WhatsApp Image 2024-10-22 at 12.40.02 PM.jpeg' },
    { id: 3, name: 'Juego 3', category: 'videojuegos', price: 450, image: '/assets/WhatsApp Image 2024-10-22 at 12.44.43 PM.jpeg' },
    { id: 4, name: 'Juego 4', category: 'videojuegos', price: 600, image: '/assets/Portada truth1.png' },
    { id: 5, name: 'Juego 5', category: 'videojuegos', price: 280, image: '/assets/WhatsApp Image 2024-10-22 at 12.44.43 PM.jpeg' },
    { id: 6, name: 'Juego 6', category: 'videojuegos', price: 470, image: '/assets/WhatsApp Image 2024-10-22 at 12.44.43 PM.jpeg' },
    { id: 7, name: 'Juego 7', category: 'videojuegos', price: 520, image: '/assets/Portada truth1.png' },
    { id: 8, name: 'Juego 8', category: 'videojuegos', price: 430, image: '/assets/WhatsApp Image 2024-10-22 at 12.40.02 PM.jpeg' },
    // Agrega más productos aquí
  ];

  filteredProducts = [...this.products];  // Copia inicial de productos
  showComingSoon: boolean = false;  // Nueva bandera para mostrar el mensaje

  filterCategory(category: string) {
    if (category === 'merchandising') {
      this.showComingSoon = true;  // Activa el mensaje de "Coming Soon"
      this.filteredProducts = [];  // Vacía la lista de productos
    } else {
      this.showComingSoon = false;  // Desactiva el mensaje de "Coming Soon"
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
    this.filterByName();
  }

  filterByName() {
    if (this.searchQuery) {
      this.filteredProducts = this.filteredProducts.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  orderByPrice() {
    if (this.order === 'asc') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.order === 'desc') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    } else {
      this.filteredProducts = [...this.products];  // Volver a ordenar por defecto
    }
    this.filterByName();  // Aplica la búsqueda de nuevo si es necesario
  }
}
