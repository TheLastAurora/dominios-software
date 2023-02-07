import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidato } from '../models/candidato.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  private apiUrl: string = 'http://localhost:8090/candidato';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {'headers' : this.authService.getRequestHeaders()});
  }


}
