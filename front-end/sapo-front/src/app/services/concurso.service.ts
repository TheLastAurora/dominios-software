import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConcursoService {

  private apiUrl: string = 'http://localhost:8090/concurso';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {'headers': this.authService.getRequestHeaders()});
  }

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl, {'headers': this.authService.getRequestHeaders()});
  }

  getAllCandidatos(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/candidatos`, {'headers': this.authService.getRequestHeaders()});
  }

  getAllGabaritos(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/gabaritos`, {'headers': this.authService.getRequestHeaders()});
  }
}
