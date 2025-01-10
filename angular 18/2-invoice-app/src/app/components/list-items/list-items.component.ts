import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models/item';
import { RowItemComponent } from '../row-item/row-item.component';

@Component({
  selector: 'list-items',
  standalone: true,
  imports: [RowItemComponent],
  templateUrl: './list-items.component.html',
})
export class ListItemsComponent {
  @Input() items: Item[] = [];
  @Output() removeItemEvent: EventEmitter<number> = new EventEmitter();

  onRemove(id: number) {
    this.removeItemEvent.emit(id);
  }
}
