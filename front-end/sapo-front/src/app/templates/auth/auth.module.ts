import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthComponent } from './auth.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
