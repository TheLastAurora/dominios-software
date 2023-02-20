import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConcursoService {

  private apiUrl: string = 'http://localhost:8090/concurso';

  private id = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  getById(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.concursoId}`, {'headers': this.authService.getRequestHeaders()});
  }

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl, {'headers': this.authService.getRequestHeaders()});
  }

  getAllCandidatos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.concursoId}/candidatos`, {'headers': this.authService.getRequestHeaders()});
  }

  getAllGabaritos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.concursoId}/gabaritos`, {'headers': this.authService.getRequestHeaders()});
  }

  get concursoId(): number {
    return this.id.value
  }

  setConcursoId(id: number){
    this.id.next(id);
  }
}
