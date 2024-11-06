import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { httpsCallable, Functions } from '@angular/fire/functions';
import { Router } from '@angular/router'; // Import Router
import emailjs from 'emailjs-com';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService, public authService: AuthService, private functions: Functions, private router: Router) {}

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
    this.sendConfirmationEmail();
    this.clearCart();
  }

  private sendConfirmationEmail(): void {
    // Retrieve the user's email
    const userEmail: string | undefined = this.authService.currentUser?.email ?? undefined;
  
    if (!userEmail) {
      console.error("User email is not available. Cannot send confirmation email.");
      return;
    }
  
    // Retrieve the cart items
    const cartItems = this.cartService.getCart();
  
    if (!cartItems || cartItems.length === 0) {
      console.error("Cart is empty. Cannot send confirmation email.");
      return;
    }
  
    // Prepare product details for the email
    const productDetails = cartItems.map(product => product.name).join(', ');
  
    // Define parameters for the EmailJS template
    const templateParams = {
      user_email: userEmail,
      product_list: productDetails,
    };
  
    // Send email with EmailJS
    emailjs.send('service_jzi5xrx', 'template_jp7j10e', templateParams, '_gBCmglhX8bBrkCOg')
      .then((response) => {
        console.log('Confirmation email sent:', response.status, response.text);
        this.router.navigate(['/main']);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }


  
}
