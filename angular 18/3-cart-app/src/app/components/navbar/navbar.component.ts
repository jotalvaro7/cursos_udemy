import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../data/card';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  @Input() items: CartItem[] = [];
  @Output() showCartEventEmitter = new EventEmitter<boolean>();;

  toggleCart(): void {
    this.showCartEventEmitter.emit();
  }
}
