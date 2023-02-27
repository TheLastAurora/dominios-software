import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {

  @Input()
  username?: string;

  constructor() { }

  get firstName(): string {
    let names = this.username != undefined ? this.username?.trim().split(' ') : '';
    return names[0];
  }

}
