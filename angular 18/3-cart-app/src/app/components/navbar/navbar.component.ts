import { Component, input } from '@angular/core';
import { CartItem } from '../../models/cart';
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
