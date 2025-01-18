import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../store/items.action';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html'
})
export class CounterComponent {

  private store = inject(Store<{ counter: number }>);

  title = signal('Counter using redux!');
  counter = signal(0);

  constructor() {
    this.store.select('counter').subscribe(count =>
      this.counter.set(count));
  }


  increment(): void {
    this.store.dispatch(increment());
  }

  decrement(): void {
    this.store.dispatch(decrement());
  }

  reset(): void {
    this.store.dispatch(reset());
  }

}
