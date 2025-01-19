import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'catalog', loadComponent: () => import('./components/catalog/catalog.component').then(c => c.CatalogComponent) },
  { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then(c => c.CartComponent) },
  { path: '', redirectTo: '/catalog', pathMatch: 'full' },
];

