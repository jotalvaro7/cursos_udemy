import { User } from './../../models/user';
import { Component, inject, effect, signal, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit, OnDestroy {

  private readonly formBuilder = inject(FormBuilder);
  private readonly sharingDataService = inject(SharingDataService);
  private readonly route = inject(ActivatedRoute);
  protected readonly user = signal<User>(new User());
  private readonly destroy$ = new Subject<void>();
  protected userForm = this.formBuilder.group({
    id: [0],
    name: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [
      Validators.required, 
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]],
    username: ['', [
      Validators.required, 
      Validators.minLength(8),
      Validators.pattern('^[a-zA-Z0-9._-]*$')
    ]],
    password: ['', [
      Validators.required, 
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$')
    ]]
  });

  constructor() {
    this.setupUserEffect();
  }

  ngOnInit(): void {
    this.subscribeToUserSelected();
    this.loadUserFromRoute();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUserFromRoute() {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id: number = Number(params.get('id'));
        if (id > 0) {
          this.handleUserLoading(id);
        }
      },
      error: (error) => {
        console.error('Error loading user from route', error);
      }
    });
  }
 
  private handleUserLoading(id: number) {
    this.sharingDataService.findById(id);
  }

  private subscribeToUserSelected() {
    this.sharingDataService.userSelected$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: user => this.user.set(user),
        error: (error) => {
          console.error('Error subscribing to user selected', error);
        }
      });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.sharingDataService.addNewUser({...this.userForm.value as User});
      this.userForm.reset();
    }
  }
  
  private setupUserEffect(): void {
    effect(() => {
      this.userForm.patchValue(this.user());
    });
  }

}
