import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = 'http://localhost:8090/login';

  constructor(private http: HttpClient) { }

  login(body: Credentials): Observable<any> {
    return this.http.post<string>(this.apiUrl, body);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  setToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

}
