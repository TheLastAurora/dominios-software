import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

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
    private fb: FormBuilder,
    private router: Router,
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
    this.authService.login(this.data).subscribe({
      next: (data) => {
        this.authService.setToken(data);
        this.router.navigate(['admin']);
      },
      error: (error) => console.log(error)
    });
  }

}
