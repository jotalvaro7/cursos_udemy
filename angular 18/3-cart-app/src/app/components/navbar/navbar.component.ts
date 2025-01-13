import { Component, EventEmitter, Input, output, Output, input, effect, signal } from '@angular/core';
import { CartItem } from '../../data/card';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  //@Input() items: CartItem[] = [];
  //@Output() showCartEventEmitter = new EventEmitter<boolean>();
  public items = input.required<CartItem[]>();
  public showCartEventEmitter = output();

  toggleCart(): void {
    this.showCartEventEmitter.emit();
  }
}
