import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';
import { InputComponent } from './input/input.component';
import { TextAreaInputComponent } from './text-area-input/text-area-input.component';
import { CharInputComponent } from './char-input/char-input.component';



@NgModule({
  declarations: [
    TextInputComponent,
    InputComponent,
    TextAreaInputComponent,
    CharInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    TextInputComponent,
    InputComponent,
    TextAreaInputComponent,
    CharInputComponent
  ]
})
export class InputsModule { }
