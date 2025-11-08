import { Component } from '@angular/core';
import { Customer } from '../models/customer';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class RegisterComponent {
  successMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit(formValue: any) {
    const customer: Customer = formValue;
    this.authService.register(customer);
    this.successMessage = 'Registration successful! You can now login.';
  }
}
