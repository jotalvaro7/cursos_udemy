import { Component, input, output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent {

  users = input.required<User[]>();
  //@Output() deleteUserEventEmitter = new EventEmitter<number>();
  deleteUserEventEmitter = output<number>();

  onDeleteUser(id: number): void {

    const confirmRemove = confirm('Are you sure you want to delete this user?');
    if (confirmRemove) {
      this.deleteUserEventEmitter.emit(id);
    }
  }

}
