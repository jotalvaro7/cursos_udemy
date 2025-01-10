import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'tr[row-item]',
  standalone: true,
  imports: [],
  templateUrl: './row-item.component.html',
})
export class RowItemComponent {

  @Input() item: Item = new Item();
  @Output() removeItemEvent: EventEmitter<number> = new EventEmitter();
  
  removeItem(id: number) {
    this.removeItemEvent.emit(id);
  }

}
