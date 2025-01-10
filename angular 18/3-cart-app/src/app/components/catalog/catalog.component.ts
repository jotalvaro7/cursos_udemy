import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent {

  @Input() products: Product[] = [];
  @Output() addToCartEmitter = new EventEmitter<Product>();

  onAddToCart(product: Product) {
    this.addToCartEmitter.emit(product);
  }

}
