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
    { name: 'Juego 1', category: 'videojuegos', price: 500, image: 'https://wallpapers.com/images/hd/1280-x-720-gaming-soqj7bpn2ev1xmi4.jpg' },
    { name: 'Juego 2', category: 'videojuegos', price: 350, image: 'https://wallpapers.com/images/hd/1280-x-720-gaming-soqj7bpn2ev1xmi4.jpg' },
    { name: 'Juego 3', category: 'videojuegos', price: 450, image: 'https://wallpapers.com/images/hd/1280-x-720-gaming-soqj7bpn2ev1xmi4.jpg' },
    { name: 'Juego 4', category: 'videojuegos', price: 600, image: 'https://wallpapers.com/images/hd/1280-x-720-gaming-soqj7bpn2ev1xmi4.jpg' },
    { name: 'Playera 1', category: 'merchandising', price: 250, image: 'https://wallpapers.com/images/hd/1280-x-720-gaming-soqj7bpn2ev1xmi4.jpg' },
    { name: 'Playera 2', category: 'merchandising', price: 150, image: 'https://wallpapers.com/images/hd/1280-x-720-gaming-soqj7bpn2ev1xmi4.jpg' },
    { name: 'Playera 3', category: 'merchandising', price: 350, image: 'https://wallpapers.com/images/hd/1280-x-720-gaming-soqj7bpn2ev1xmi4.jpg' },
    { name: 'Playera 4', category: 'merchandising', price: 400, image: 'https://wallpapers.com/images/hd/1280-x-720-gaming-soqj7bpn2ev1xmi4.jpg' },
    // Agrega más productos aquí
  ];

  filteredProducts = [...this.products];  // Copia inicial de productos

  filterCategory(category: string) {
    this.filteredProducts = this.products.filter(product => product.category === category);
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
