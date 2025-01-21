import { Component, computed, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from "./user/user.component";
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserComponent, UserFormComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit {

  private counterId: number = 7;

  title: string = 'User List!!!';
  public users = signal<User[]>([]);
  public userSelected = signal<User | null>(null);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.userService.findAll().subscribe((users) => {
      this.users.set(users);
    });
  }

  addUser(user: User) {
    if(user.id > 0) {
      this.users.update(users => users.map(u => u.id === user.id ? {...user} : u ));
    } else {
      this.users.update((users) => [...users, { ...user, id: this.counterId++ }]);
    }
    this.userSelected.set(null);
  }

  deleteUser(id: number): void {
    this.users.update(users => users.filter(user => user.id !== id));
  }

  selectedUser(userRow: User): void {
    this.userSelected.set(userRow);
  }
}
