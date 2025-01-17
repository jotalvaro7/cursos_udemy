import { SharingDataService } from './../../services/sharing-data.service';
import { Component, computed, inject, signal } from '@angular/core';
import { CartItem } from '../../models/cart';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  items = signal<CartItem[]>([]);
  private sharingDataService = inject(SharingDataService);

  constructor(private router: Router) {
    this.items.set(this.router.getCurrentNavigation()?.extras.state?.['items'] || []);
  }

  total = computed(() => this.items().reduce((acc, item) => acc + item.product.price * item.quantity, 0));

  onDeleteCart(id: number): void {
    this.sharingDataService.setId(id);
  }
}
