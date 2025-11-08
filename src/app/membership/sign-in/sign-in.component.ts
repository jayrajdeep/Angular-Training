import { Component } from '@angular/core';
import { Customer } from '../models/customer';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class SigninComponent {
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService) {}

  onLogin(formValue: any) {
    const customer = this.authService.login(formValue.email, formValue.password);

    if (customer) {
      this.successMessage = `Welcome back, ${customer.firstName}!`;
      this.errorMessage = '';
      // optionally store current user
      localStorage.setItem('loggedInUser', JSON.stringify(customer));
    } else {
      this.errorMessage = 'Invalid email or password';
      this.successMessage = '';
    }
  }
}
