import { Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  { path: 'catalog', component: CatalogComponent },
  { path: 'cart', component: CartComponent },
  { path: '', redirectTo: '/catalog', pathMatch: 'full' },
];
