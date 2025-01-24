import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from "./user/user.component";
import { UserFormComponent } from './user-form/user-form.component';
import { SweetAlertService } from '../services/sweet-alert.service';
import { Colors } from '../constants/colors';


@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserComponent, UserFormComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit {

  private counterId: number = 7;

  title: string = 'User List!!!';
  showModal= signal<boolean>(false);
  public users = signal<User[]>([]);
  public userSelected = signal<User | null>(null);
  private userService = inject(UserService);
  private sweetAlertService = inject(SweetAlertService);

  ngOnInit(): void {
    this.userService.findAll().subscribe((users) => {
      this.users.set(users);
    });
  }

  addUser(user: User) {
    if (user.id > 0) {
      this.users.update(users => users.map(u => u.id === user.id ? { ...user } : u));
    } else {
      this.users.update((users) => [...users, { ...user, id: this.counterId++ }]);
    }
    this.sweetAlertService.show(
      "Saved!", 
      "User saved successfully!", 
      "success", 
      false, 
      Colors.primary, 
      Colors.secondary, 
      "Ok"
    );
    this.showModal.set(false);
    this.userSelected.set(null);
  }

  async deleteUser(id: number) {
    const result = await this.sweetAlertService.show(
      "Are you sure you want to delete this user?",
      "The user will be deleted of system!",
      "warning",
      true,
      Colors.primary,
      Colors.secondary,
      "Yes!"
    );

    if (result.isConfirmed) {
      this.users.update(users => users.filter(user => user.id !== id));
      this.sweetAlertService.show(
        "Deleted!", 
        `User with id: ${id} deleted successfully!`, 
        "success", 
        false, 
        Colors.primary,
        Colors.secondary, 
        "Ok"
      );
    }

  }

  selectedUser(userRow: User): void {
    this.userSelected.set(userRow);
    this.showModal.set(true);
  }

  triggerModal(): void {
    this.showModal.set(!this.showModal());
    this.userSelected.set(null);
  }


}
