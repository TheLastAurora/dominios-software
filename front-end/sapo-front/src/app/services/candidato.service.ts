import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  private apiUrl: string = 'http://localhost:8090/candidato';

  constructor() { }
}
