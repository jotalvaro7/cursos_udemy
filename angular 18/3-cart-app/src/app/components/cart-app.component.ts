import { Product } from '../models/product';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CartItem } from '../models/cart';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';
import { SweetAlertIcon } from 'sweetalert2';
import { Store } from '@ngrx/store';
import { ItemsState } from '../store/items.reducer';
import { addItem, removeItem } from '../store/items.actions';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  items = signal<CartItem[]>([]);

  private sharingDataService = inject(SharingDataService);
  private router = inject(Router);
  private store = inject(Store<{ items: ItemsState }>);

  ngOnInit(): void {
    this.store.select('items').subscribe((state) => {
      this.items.set(state.items);
    });
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharingDataService.addToCart$.subscribe((product: Product) => {
      this.store.dispatch(addItem({ product }));
      this.swalAlertSuccessNotification('Shopping Cart', 'Product added to cart!!', 'success');
    });
  }

  onDeleteCart(): void {
    this.sharingDataService.id$.subscribe((id: number) => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'The item will be deleted!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(removeItem({ id }));
          this.navigateToCart();
          this.swalAlertSuccessNotification('Deleted!', 'The item has been deleted.', 'success');
        }
      });
    });
  }

  private navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  private swalAlertSuccessNotification(title: string, text: string, icon: string): void {
    Swal.fire({
      title,
      text,
      icon: icon as SweetAlertIcon,
    });
  }

  private _save = effect(() => {
    sessionStorage.setItem('cart', JSON.stringify(this.items()));
  });
}
