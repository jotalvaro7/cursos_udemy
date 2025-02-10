import { User } from './../../models/user';
import { Component, inject, effect, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharingDataService } from '../../services/sharing-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  private readonly formBuilder = inject(FormBuilder);
  private readonly sharingDataService = inject(SharingDataService);
  private readonly router = inject(Router);
  protected readonly user = signal<User | null>(null);
  protected userForm = this.formBuilder.group({
    id: [0],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor() {
    this.loadUserFromNavigation();
    this.setupUserEffect();
  }

  private loadUserFromNavigation() {
    const navigation = this.router.getCurrentNavigation();
    this.user.set(navigation?.extras.state?.['user'] ?? null)
  }
 
  onSubmit() {
    if (this.userForm.valid) {
      this.sharingDataService.addNewUser({...this.userForm.value as User});
      this.userForm.reset();
    }
  }
  
  private setupUserEffect(): void {
    effect(() => {
      const currentUser = this.user();
      if (currentUser) {
        this.userForm.patchValue(currentUser);
      }
    });
  }

}
