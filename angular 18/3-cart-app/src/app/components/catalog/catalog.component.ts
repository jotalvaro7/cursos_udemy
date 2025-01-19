import { products } from './../../data/product.data';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Component, inject, OnInit } from '@angular/core';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';
import { Store } from '@ngrx/store';
import { ProductsState } from '../../store/products.reducer';
import { loadProducts } from '../../store/products.actions';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  private productService = inject(ProductService);
  private sharingDataService = inject(SharingDataService);
  private store = inject(Store<{ products: ProductsState }>)

  constructor() {
    this.store.select('products').subscribe((state) => this.products = state.products);
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts({ products: this.productService.findAll() }));
  }

  onAddToCart(product: Product) {
    this.sharingDataService.setAddToCart(product);
  }
}
