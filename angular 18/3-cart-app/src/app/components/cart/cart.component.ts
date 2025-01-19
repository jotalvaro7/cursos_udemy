import { SharingDataService } from './../../services/sharing-data.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CartItem } from '../../models/cart';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reducer';
import { total } from '../../store/items.actions';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  private sharingDataService = inject(SharingDataService);
  private store = inject(Store<{ items: ItemsState }>);

  items = signal<CartItem[]>([]);
  total = signal<number>(0);

  constructor() {
    this.store.select('items').subscribe((state) => {
      this.items.set(state.items);
      this.total.set(state.total);
    });
  }
  ngOnInit(): void {
    this.store.dispatch(total());
  }

  onDeleteCart(id: number): void {
    this.sharingDataService.setId(id);
  }
}
