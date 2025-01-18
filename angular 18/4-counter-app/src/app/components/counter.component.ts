import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html'
})
export class CounterComponent {

  title = signal('Counter using redux!');
  counter = signal(0);


  increment(): void {
    this.counter.set(this.counter() + 1);
    this.title.set('Ohh the counter is incremented!');
  }

  decrement(): void {
    this.counter.set(this.counter() - 1);
    this.title.set('Ohh the counter is decremented!');
  }

  reset(): void {
    this.counter.set(0);
    this.title.set('Counter is reset!');
  }

}
