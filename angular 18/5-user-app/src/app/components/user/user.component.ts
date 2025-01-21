import { Component, Input, input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent {

  users = input.required<User[]>();

}
