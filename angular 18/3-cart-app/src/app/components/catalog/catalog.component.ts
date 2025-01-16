import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Component, inject, OnInit } from '@angular/core';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  private ProductService = inject(ProductService);
  private sharingDataService = inject(SharingDataService);

  ngOnInit(): void {
    this.products = this.ProductService.findAll();
  }

  onAddToCart(product: Product) {
    this.sharingDataService.setAddToCart(product);
  }
}
