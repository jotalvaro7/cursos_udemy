import { Product } from '../models/product';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CartItem } from '../models/cart';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';
import { SweetAlertIcon } from 'sweetalert2';

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

  ngOnInit(): void {
    this.items.set(JSON.parse(sessionStorage.getItem('cart') || '[]'));
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharingDataService.addToCart$.subscribe((product: Product) => {
      const hasItem = this.findItemInCart(product.id);
      if (hasItem) {
        this.increaseQuantityForItem(product);
      } else {
        this.addNewItem(product);
      }
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
          const updatedItems = this.removeItemFromCart(id);
          this.items.set(updatedItems);
          this.handleEmptyCart();
          this.navigateToCart();
          this.swalAlertSuccessNotification('Deleted!', 'The item has been deleted.', 'success');
        }
      });
    });
  }

  private findItemInCart(id: number): CartItem | undefined {
    return this.items().find((item) => item.product.id === id);
  }

  private increaseQuantityForItem(product: Product): void {
    this.items.update((items) => items.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
  }

  private addNewItem(product: Product): void {
    this.items.set([...this.items(), { product: { ...product }, quantity: 1 }]);
  }

  private removeItemFromCart(id: number): CartItem[] {
    return this.items().filter((item) => item.product.id !== id);
  }

  private handleEmptyCart(): void {
    if (this.items().length == 0) {
      sessionStorage.removeItem('cart');
      sessionStorage.clear();
    }
  }

  private navigateToCart(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/cart'], {
        state: {
          items: this.items(),
        },
      });
    });
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
