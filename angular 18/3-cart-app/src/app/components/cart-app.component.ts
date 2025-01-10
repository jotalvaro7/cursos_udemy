import { Product } from '../models/product';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductService } from './../services/product.service';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CartItem } from '../data/card';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalCartComponent } from './modal-cart/modal-cart.component';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, ModalCartComponent, NavbarComponent],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  private ProductService = inject(ProductService);

  @Output() showCartEventEmitter = new EventEmitter<boolean>();

  products: Product[] = [];
  items: CartItem[] = [];
  total: number = 0;
  showCart: boolean = false;

  ngOnInit(): void {
    this.products = this.ProductService.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]')
    this.calculateTotal();
  }

  onAddToCart(product: Product): void {
    const item = this.items.find((item) => item.product.id === product.id);
    if (item) {
      this.items = this.items.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      this.items = [...this.items, { product: { ...product }, quantity: 1 }];
    }
    this.calculateTotal();
    this.saveSession();
  }

  onDeleteCart(id: number): void {
    this.items = this.items.filter((item) => item.product.id !== id);
    this.calculateTotal();
    this.saveSession();
  }

  calculateTotal(): void {
    this.total = this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }
}
