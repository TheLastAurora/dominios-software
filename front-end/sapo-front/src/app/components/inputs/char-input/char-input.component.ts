import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-char-input',
  templateUrl: './char-input.component.html',
  styleUrls: ['./char-input.component.scss']
})
export class CharInputComponent {

  @Input()
  label?: string;

  @Input()
  control?: FormControl;

  constructor() { }

}
