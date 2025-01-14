import { Product } from '../models/product';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductService } from './../services/product.service';
import { Component, inject, OnInit, signal} from '@angular/core';
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

  products = signal<Product[]>([]);
  items = signal<CartItem[]>([]);
  showCart = signal<boolean>(false);

  ngOnInit(): void {
    this.products.set(this.ProductService.findAll());
    this.items.set(JSON.parse(sessionStorage.getItem('cart') || '[]'));
  }

  onAddToCart(product: Product): void {
    const currentItems = this.items();
    const item = currentItems.find((item) => item.product.id === product.id);
    if (item) {
      this.items.set(currentItems.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      this.items.set([...currentItems, { product: { ...product }, quantity: 1 }]);
    }
  }

  onDeleteCart(id: number): void {
    const currentItems = this.items();
    const updatedItems = currentItems.filter((item) => item.product.id !== id);
    this.items.set(updatedItems);

    if(this.items().length == 0){
      sessionStorage.removeItem('cart');
      sessionStorage.clear();
    }
  }

  toggleCart(): void {
    this.showCart.set(!this.showCart());
  }
}
