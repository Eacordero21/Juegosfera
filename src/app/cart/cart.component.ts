import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { httpsCallable, Functions } from '@angular/fire/functions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService, public authService: AuthService, private functions: Functions) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart(); // Retrieve cart items from service
    this.loadPayPalButton();
  }

  getTotal() {
    return this.cartItems.reduce((total, product) => total + product.price, 0); // Calculate total price
  }

  clearCart() {
    this.cartItems = this.cartService.clearCart(); // Clear the cart
    alert('Carrito vaciado.');
  }

  public loadPayPalButton() {
    const checkPayPal = setInterval(() => {
      if ((window as any).paypal) {
        console.log("PayPal SDK loaded."); // Debug line to confirm SDK is ready
        clearInterval(checkPayPal);
  
        // Render the PayPal button
        (window as any).paypal.Buttons({
          createOrder: (data: Record<string, unknown>, actions: any) => {
            const total = this.getTotal();
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: total.toFixed(2),
                  currency_code: 'MXN'
                }
              }]
            });
          },
          onApprove: async (data: Record<string, unknown>, actions: any) => {
            const order = await actions.order.capture();
            this.handleSuccessfulPayment(order);
          },
          onError: (err: any) => {
            console.error('PayPal error:', err);
          }
        }).render('#paypal-button-container');
      } else {
        console.log("Waiting for PayPal SDK to load..."); // Debug line for missing SDK
      }
    }, 500); // Check every 500ms until PayPal SDK is loaded
  }
  
  

  private handleSuccessfulPayment(order: any) {
    this.cartService.clearCart();
    this.sendConfirmationEmail();
  }

  private sendConfirmationEmail() {
    // Get the current user's email
    const userEmail = this.authService.currentUser?.email;
  
    // Retrieve the cart items
    const cartItems = this.cartService.getCart();
  
    // Check if userEmail and cartItems are defined
    if (!userEmail) {
      console.error("User email is not available. Cannot send confirmation email.");
      return; // Exit the function if no email is found
    }
  
    if (cartItems.length === 0) {
      console.error("Cart is empty. Cannot send confirmation email.");
      return; // Exit the function if cart is empty
    }
  
    // Access the first product in the cart safely
    const product = cartItems[0];
  
    // Ensure product properties are defined
    if (!product?.name || !product?.downloadLink) {
      console.error("Product information is incomplete. Cannot send confirmation email.");
      return; // Exit if product info is incomplete
    }
  
    // Create a callable function to send the email
    const sendEmailFn = httpsCallable(this.functions, 'sendPurchaseConfirmation');
  
    // Send the confirmation email
    sendEmailFn({ email: userEmail, productName: product.name, downloadLink: product.downloadLink })
      .then(() => {
        console.log('Confirmation email sent to:', userEmail);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }
  
}
