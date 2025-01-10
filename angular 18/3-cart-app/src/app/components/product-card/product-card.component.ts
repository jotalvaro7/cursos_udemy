import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'div[product-card]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {

  @Input() product: Product = new Product();
  @Output() addToCartEmitter = new EventEmitter<Product>();

  onAddToCart(product: Product) {
    this.addToCartEmitter.emit(product);
  }

}
