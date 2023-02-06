import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = 'http://localhost:8090/user';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  create(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

}
