import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'Hello World Angular from the component!!!';
  
  subTitle: string = 'Counter with session state';
  
  users: string[] = ['Pepe', 'Juan', 'Ana', 'Maria'];
  
  visible: boolean = false;
  
  counter: number = 0;
  
  ngOnInit(): void {
    if(typeof sessionStorage !== 'undefined') {
      this.counter = Number(sessionStorage.getItem('counter'));
    } else {
      this.counter = 0;
    }
  }

  setVisible() {
    this.visible = !this.visible;
  }

  setCounter(counter: number) {
    this.counter = counter;
  }
}
