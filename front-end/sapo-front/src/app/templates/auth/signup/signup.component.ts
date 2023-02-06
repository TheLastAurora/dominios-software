import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userForm!: FormGroup;

  data: User = {
    nome: '',
    login: '',
    senha: ''
  }

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  get nomeControl(): FormControl {
    return this.userForm?.controls['nome'] as FormControl;
  }

  get loginControl(): FormControl {
    return this.userForm?.controls['login'] as FormControl;
  }

  get senhaControl(): FormControl {
    return this.userForm?.controls['senha'] as FormControl;
  }

  get nome(): string {
    return this.userForm?.controls['nome'].value;
  }

  get login(): string {
    return this.userForm?.controls['login'].value;
  }

  get senha(): string {
    return this.userForm?.controls['senha'].value;
  }

  createForm(): void {
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      login: ['', Validators.required],
      senha: ['', Validators.required]
    })
  }

  goToLogin(): void {
    this.router.navigate(['auth/login']);
  }

  submit(): void {
    this.data.nome = this.nome;
    this.data.login = this.login;
    this.data.senha = this.senha;
    this.userService.create(this.data).subscribe({
      next: () => this.goToLogin()
      ,
      error: (error) => console.log(error)      
    });
  }

}
