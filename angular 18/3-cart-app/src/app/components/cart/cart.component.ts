import {
  Component,
  computed,
  effect,
  input,
  output,
} from '@angular/core';
import { CartItem } from '../../data/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  /**
   * Code using signals
   */
  items = input.required<CartItem[]>();
  idProductEventEmitter = output<number>();

  onDeleteCart(id: number): void {
    this.idProductEventEmitter.emit(id);
  }

  total = computed(() =>
    this.items().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  );

  private _save = effect(() => {
    sessionStorage.setItem('cart', JSON.stringify(this.items()));
  });

}

/**
 ** Code using onChanges (old code)
 * 
 ** export class CartComponent implements OnChanges {
 ** @Input() items: CartItem[] = [];
 ** @Output() idProductEventEmitter = new EventEmitter<number>();
 ** total = 0;
  
 ** ngOnChanges(changes: SimpleChanges): void {
 **   this.calculateTotal();
 **   this.saveSession();
 ** }

 ** onDeleteCart(id: number): void {
 **   this.idProductEventEmitter.emit(id);
 ** }

 ** calculateTotal(): void {
 **   this.total = this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
 ** }

 ** saveSession(): void {
 **   sessionStorage.setItem('cart', JSON.stringify(this.items));
 ** }
*/