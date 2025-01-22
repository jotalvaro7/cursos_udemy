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
  selectedUserEventEmitter = output<User>();

  onDeleteUser(id: number): void {
    this.deleteUserEventEmitter.emit(id);
  }

  onSelectedUser(user: User): void {
    this.selectedUserEventEmitter.emit(user);
  }

}
