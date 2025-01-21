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

  title: string = 'User List!!!';
  public users = signal<User[]>([]);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.userService.findAll().subscribe((users) => {
      this.users.set(users);
    });
  }

  addUser(user: User) {
    this.users.update((users) => [...users, user]);
  }

  logEffect = effect(() => {
    console.log(this.users());
  })

}
