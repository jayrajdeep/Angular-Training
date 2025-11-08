import { Injectable } from '@angular/core';
import { Item as CartItem } from './models/Item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'shoppingCart';
  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCartFromStorage());

  cart$ = this.cartSubject.asObservable();

  constructor() {
    // Add default item if cart is empty
    if (this.getCartItems().length === 0) {
      const defaultItem = new CartItem(1, 'Rose', 15, 1, '/assets/images/rose.jpg');
      this.addToCart(defaultItem);
    }
  }

  private loadCartFromStorage(): CartItem[] {
    const data = sessionStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveCart(cart: CartItem[]) {
    sessionStorage.setItem(this.storageKey, JSON.stringify(cart));
    this.cartSubject.next(cart); // Notify subscribers
  }

  addToCart(item: CartItem) {
    const cart = this.loadCartFromStorage();
    const existingItem = cart.find(ci => ci.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.push(item);
    }
    this.saveCart(cart);
  }

  updateQuantity(productId: number, quantity: number) {
    const cart = this.loadCartFromStorage();
    const item = cart.find(ci => ci.productId === productId);
    if (item) {
      item.quantity = quantity >= 1 ? quantity : 1;
      this.saveCart(cart);
    }
  }

  removeFromCart(productId: number) {
    let cart = this.loadCartFromStorage();
    cart = cart.filter(ci => ci.productId !== productId);
    this.saveCart(cart);
  }

  clearCart() {
    this.saveCart([]);
  }

  getCartItems(): CartItem[] {
    return this.loadCartFromStorage();
  }

  getTotalPrice(): number {
    const cart = this.loadCartFromStorage();
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getTotalItems(): number {
    const cart = this.loadCartFromStorage();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}
