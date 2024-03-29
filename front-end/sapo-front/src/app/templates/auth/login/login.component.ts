import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EventTypes } from 'src/app/models/toast.model';
import { Credentials } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SplashScreenService } from 'src/app/services/splash-screen.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authForm!: FormGroup;

  data: Credentials = {
    login: '',
    senha: ''
  };

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private fb: FormBuilder,
    private router: Router,
    private splashScreen: SplashScreenService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  get loginControl(): FormControl {
    return this.authForm?.controls['login'] as FormControl;
  }

  get senhaControl(): FormControl {
    return this.authForm?.controls['senha'] as FormControl;
  }

  get login(): string {
    return this.authForm?.controls['login'].value;
  }

  get senha(): string {
    return this.authForm?.controls['senha'].value;
  }

  createForm(): void{
    this.authForm = this.fb.group({
      login: ['', Validators.required],
      senha: ['', Validators.required]
    })
  }

  signup(): void{
    this.router.navigate(['auth/signup']);
  }

  submit(): void{
    this.data.login = this.login;
    this.data.senha = this.senha;
    this.splashScreen.start();
    this.authService.login(this.data).subscribe({
      next: (data) => {
        this.authService.setToken(data);
        this.toast.success("Login realizado com sucesso");
        this.router.navigate(['admin']);
      },
      error: (error) => {
        this.toast.error(error.error.message);
      }
    });
    this.splashScreen.stop();
  }

}
