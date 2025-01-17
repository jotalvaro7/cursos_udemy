import { Component, input, OnInit } from '@angular/core';
import { CartItem } from '../../data/cart';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  //@Input() items: CartItem[] = [];
  items = input.required<CartItem[]>();
}
