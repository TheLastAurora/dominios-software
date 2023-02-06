import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';
import { SelectInputComponent } from './select-input/select-input.component';
import { DateInputComponent } from './date-input/date-input.component';



@NgModule({
  declarations: [
    TextInputComponent,
    SelectInputComponent,
    DateInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    TextInputComponent,
    SelectInputComponent,
    DateInputComponent
  ]
})
export class InputsModule { }
