import { Product } from '../models/product';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CartItem } from '../data/card';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';

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
    this.onAddToCart();
  }

  onAddToCart(): void {
    this.sharingDataService.addToCart$.subscribe((product: Product | null) => {
      if (product) {
        const currentItems = this.items();
        const item = currentItems.find(
          (item) => item.product.id === product.id
        );
        if (item) {
          this.items.set(
            currentItems.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          );
        } else {
          this.items.set([
            ...currentItems,
            { product: { ...product }, quantity: 1 },
          ]);
        }
        this.router.navigate(['/cart'], {
          state: {
            items: this.items(),
          },
        });
      }
    });
  }

  onDeleteCart(): void {
    this.sharingDataService.id$.subscribe((id: number) => {
      const currentItems = this.items();
      const updatedItems = currentItems.filter(
        (item) => item.product.id !== id
      );
      this.items.set(updatedItems);
      if (this.items().length == 0) {
        sessionStorage.removeItem('cart');
        sessionStorage.clear();
      }

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/cart'], {
          state: {
            items: this.items(),
          },
        });
      });
    });
  }

  private _save = effect(() => {
    sessionStorage.setItem('cart', JSON.stringify(this.items()));
  });
}
