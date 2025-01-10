import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'form-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-item.component.html',
})
export class FormItemComponent {
  @Output() addItemEventEmitter = new EventEmitter();

  private readonly initialCounterId: number = 4;
  private counterId: number = this.initialCounterId;
  private formBuilder = inject(FormBuilder);

  // ** Using FormBuilder to create the form because it's more flexible and easier to use than FormGroup
  itemForm = this.formBuilder.group({
    product: ['', [Validators.required, Validators.minLength(5)]],
    price: ['', [Validators.required, Validators.min(10)]],
    quantity: ['', [Validators.required, Validators.min(1)]],
  });

  // ** The problem with FormGroups is that each control is declared with a new FormControl
  // itemForm = new FormGroup({
  //   product: new FormControl('', Validators.required),
  //   price: new FormControl('', Validators.required),
  //   quantity: new FormControl('', Validators.required),
  // });

  addItem() {
    this.addItemEventEmitter.emit({id: this.counterId, ...this.itemForm.value});
    this.counterId++;
    this.itemForm.reset();
  }
}
