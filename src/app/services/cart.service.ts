import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart'; // Key for localStorage
  private cart: any[] = [];

  constructor() {
    // Load cart from localStorage when service is initialized
    const storedCart = localStorage.getItem(this.cartKey);
    this.cart = storedCart ? JSON.parse(storedCart) : [];
  }

  // Add a product to the cart and store in localStorage
  addToCart(product: any) {
    this.cart.push(product);
    this.saveCart();
  }

  // Get all products from the cart
  getCart() {
    return this.cart;
  }

  // Save the cart to localStorage
  private saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
  }

  // Clear the cart and remove from localStorage
  clearCart() {
    this.cart = [];
    localStorage.removeItem(this.cartKey);
    return this.cart;
  }
}
