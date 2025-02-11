import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Colors } from '../constants/colors';
import { User } from '../models/user';
import { NavbarComponent } from './navbar/navbar.component';
import { UserService } from '../services/user.service';
import { SweetAlertService } from '../services/sweet-alert.service';
import { SharingDataService } from '../services/sharing-data.service';

enum AlertMessages {
  DELETE_TITLE = 'Are you sure you want to delete this user?',
  DELETE_TEXT = 'The user will be deleted of system!',
  SAVED_TITLE = 'Saved!',
  SAVED_TEXT = 'User saved successfully!',
  DELETED_TITLE = 'Deleted!'
}

const ROUTES = {
  users: '/users',
  createUser: '/users/create'
} as const;

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly INITIAL_COUNTER_ID = 7;
  private counterId = this.INITIAL_COUNTER_ID;
  
  readonly users = signal<User[]>([]);
  
  private readonly userService = inject(UserService);
  private readonly sweetAlertService = inject(SweetAlertService);
  private readonly sharingDataService = inject(SharingDataService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.initializeData();
    this.initializeSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeData(): void {
    this.userService.findAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => this.users.set(users));
  }

  private initializeSubscriptions(): void {
    this.subscribeToNewUsers();
    this.subscribeToDeleteUsers();
    this.subscribeToFindById();
  }

  private subscribeToNewUsers(): void {
    this.sharingDataService.addNewUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => this.handleUserAddition(user));
  }

  private subscribeToDeleteUsers(): void {
    this.sharingDataService.idUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(async id => this.handleUserDeletion(id));
  }

  private subscribeToFindById(): void {
    this.sharingDataService.findById$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: id => {
          this.handleUserFindById(id);
        },
        error: (error) => {
          console.error('Error finding user by id', error);
        }
      });
  }
  
  private handleUserAddition(user: User): void {
    this.updateUsers(user);
    this.navigateToUsers();
    this.showSuccessMessage(
      AlertMessages.SAVED_TITLE, 
      AlertMessages.SAVED_TEXT
    );
  }

  private async handleUserDeletion(id: number): Promise<void> {
    const confirmed = await this.confirmDelete();
    if (confirmed) {
      this.deleteUser(id);
      this.refreshUsersView();
      this.showDeleteSuccessMessage(id);
    }
  }

  private handleUserFindById(id: number): void {
    const user = this.users().find(user => user.id === id);
    if(user){
      this.sharingDataService.userSelected(user);
    } else {
      console.info(`User with id: ${id}, not found`);
      this.router.navigate([ROUTES.users]);
    }
  }
  
  private updateUsers(user: User): void {
    if (this.isExistingUser(user)) {
      this.updateExistingUser(user);
    } else {
      this.addNewUser(user);
    }
  }

  private isExistingUser(user: User): boolean {
    return user.id > 0;
  }

  private updateExistingUser(user: User): void {
    this.users.update(users => 
      users.map(u => u.id === user.id ? { ...user } : u)
    );
  }

  private addNewUser(user: User): void {
    this.users.update(users => [
      ...users, 
      { ...user, id: this.counterId++ }
    ]);
  }

  private deleteUser(id: number): void {
    this.users.update(users => 
      users.filter(user => user.id !== id)
    );
  }

  private navigateToUsers(): void {
    this.router.navigate([ROUTES.users], {
      state: { users: this.users() }
    });
  }

  private async confirmDelete(): Promise<boolean> {
    const result = await this.sweetAlertService.show(
      AlertMessages.DELETE_TITLE,
      AlertMessages.DELETE_TEXT,
      "warning",
      true,
      Colors.primary,
      Colors.secondary,
      "Yes!"
    );
    return result.isConfirmed;
  }

  private showSuccessMessage(title: string, text: string): void {
    this.sweetAlertService.show(
      title,
      text,
      "success",
      false,
      Colors.primary,
      Colors.secondary,
      "Ok"
    );
  }

  private showDeleteSuccessMessage(id: number): void {
    this.showSuccessMessage(
      AlertMessages.DELETED_TITLE,
      `User with id: ${id} deleted successfully!`
    );
  }
  
  private refreshUsersView(): void {
    this.router.navigate([ROUTES.createUser], { skipLocationChange: true })
      .then(() => this.navigateToUsers());
  }
}
