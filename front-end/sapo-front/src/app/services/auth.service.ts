import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Credentials } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = 'http://localhost:8090/login';

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }

  login(body: Credentials): Observable<any> {
    return this.http.post<string>(this.apiUrl, body);
  }

  getCurrentUser(): Observable<any> {
    return this.http.put<string>('http:localhost:8090/user', {token: this.token}, {'headers': this.getRequestHeaders()});
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.router.navigate(['auth/login']);
  }

  get token(): string | null {
    return localStorage.getItem('jwt');
  }

  setToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  getRequestHeaders(): HttpHeaders{
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

}
