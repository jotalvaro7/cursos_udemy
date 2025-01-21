import { User } from './../../models/user';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  private readonly initialId: number = 7;
  private counterId: number = this.initialId;
  private formBuilder = inject(FormBuilder);

  @Output() newUserEventEmitter = new EventEmitter();

  userForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if(this.userForm.valid) {
      this.newUserEventEmitter.emit({ id: this.counterId, ...this.userForm.value });
      this.counterId++;
    }
    this.userForm.reset();
  }

}
