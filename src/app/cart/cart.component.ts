import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService, public authService: AuthService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart(); // Retrieve cart items from service
  }

  getTotal() {
    return this.cartItems.reduce((total, product) => total + product.price, 0); // Calculate total price
  }

  clearCart() {
    this.cartItems = this.cartService.clearCart(); // Clear the cart
    alert('Carrito vaciado.');
  }
}

