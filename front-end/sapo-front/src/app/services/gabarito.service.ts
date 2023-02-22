import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Gabarito } from '../models/gabarito.model';
import { ConcursoService } from './concurso.service';

@Injectable({
  providedIn: 'root'
})
export class GabaritoService {

  private apiUrl: string = 'http://localhost:8090/gabarito';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private concursoService: ConcursoService,
  ) { }

  create(gabarito: Gabarito): Observable<any> {
    gabarito.concursoId = this.concursoService.concursoId;
    gabarito.userId = 1;
    return this.http.post(`${this.apiUrl}`, gabarito, {'headers': this.authService.getRequestHeaders()});
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {'headers': this.authService.getRequestHeaders()});
  }

}
