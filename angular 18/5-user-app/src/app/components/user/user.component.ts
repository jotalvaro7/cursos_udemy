import { Component, output, signal, inject, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html'
})
export class UserComponent {

  private readonly router = inject(Router);
  private readonly sharingDataService = inject(SharingDataService);
  private readonly userService = inject(UserService);


  title: string = 'User List!!!';
  users = signal<User[]>([]);

  constructor() {
    this.loadUsersFromNavigation();
  }

  private loadUsersFromNavigation(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.users.set(navigation.extras.state['users']);
    } else {
      this.userService.findAll().subscribe(users => this.users.set(users));
    }
  }

  onDeleteUser(id: number): void {
    this.sharingDataService.idUser(id);
  }

  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit', user.id], { state: { user } });
  }

}
