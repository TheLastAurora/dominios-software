import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GabaritoService {

  private apiUrl: string = 'http://localhost:8090/gabarito';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {'headers': this.authService.getRequestHeaders()});
  }

}
