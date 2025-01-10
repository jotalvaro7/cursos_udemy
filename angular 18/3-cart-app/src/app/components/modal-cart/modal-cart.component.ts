import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../data/card';

@Component({
  selector: 'modal-cart',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './modal-cart.component.html'
})
export class ModalCartComponent {

  @Input() items: CartItem[] = [];
  @Input() total: number = 0;


  @Output() closeCartEventEmitter = new EventEmitter<boolean>();
  @Output() idProductEventEmitter = new EventEmitter<number>();

  closeCart(): void {
    this.closeCartEventEmitter.emit();
  }

  onDeleteCart(id: number): void {
    this.idProductEventEmitter.emit(id);
  }

}
