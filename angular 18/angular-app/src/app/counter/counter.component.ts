import { CalculatorService } from './../calculator.service';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit {
  
  counter: number = 0;
  // * Injecting a service
  private calculatorService = inject(CalculatorService);

  // * Input variable from parent component
  @Input() title: string = '';

  // * Output variable to parent component
  @Output() counterEmitter: EventEmitter<number> = new EventEmitter();
  //Other form to declare the output variable:
  //@Output() counterEmitter: new EventEmitter();
  
  ngOnInit(): void {

    if(typeof sessionStorage !== 'undefined') {
      this.counter = Number(sessionStorage.getItem('counter'));
    } else {
      this.counter = 0;
    }

    console.log('creating component');
  }


  setCounter(): void {
    this.counter++;
    sessionStorage.setItem('counter', this.counter.toString());
    this.counterEmitter.emit(this.counter);
  }

  totalCost = this.calculatorService.add(100, 200);
  totalCostRest = this.calculatorService.subtract(100, 200);

}
