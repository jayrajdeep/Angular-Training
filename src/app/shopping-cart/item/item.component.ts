import { Component, Input } from '@angular/core';
import { Item } from '../models/Item';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() item!: Item;

  constructor(private cartService: CartService) {}

  addToCart() {
    this.cartService.addToCart(this.item);
    alert(`${this.item.title} added to cart!`);
  }
}
