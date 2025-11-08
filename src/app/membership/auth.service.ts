import { Injectable } from '@angular/core';
import { Customer } from './models/customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'customers';

  constructor() {
    // initialize if not existing
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  getAllCustomers(): Customer[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) as Customer[] : [];
  }

  register(customer: Customer): void {
    const arr = this.getAllCustomers();
    arr.push(customer);
    localStorage.setItem(this.storageKey, JSON.stringify(arr));
  }

  login(email: string, password: string): Customer | null {
    const arr = this.getAllCustomers();
    return arr.find(c => c.email === email && c.password === password) || null;
  }
}
