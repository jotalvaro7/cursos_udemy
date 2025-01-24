import { User } from './../../models/user';
import { Component, EventEmitter, inject, input, Output, SimpleChanges, OnChanges, effect, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  private formBuilder = inject(FormBuilder);

  @Output() newUserEventEmitter = new EventEmitter();
  user = input.required<User | null>();
  modalEventEmitter = output<void>();

  userForm = this.formBuilder.group({
    id: [0],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
 
  onSubmit() {
    if(this.userForm.valid) {
      this.newUserEventEmitter.emit({...this.userForm.value });
    }
    this.userForm.reset();
  }
  
  userEffect = effect(() => {
    const currentUser = this.user();
    if(currentUser) {
      this.userForm.patchValue(currentUser);
    }
  });

  triggerModal() {
    this.modalEventEmitter.emit();
  }

}
