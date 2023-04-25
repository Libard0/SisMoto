import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Calificacion } from 'src/app/models/calificacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  API_URI = 'http://localhost:3000/api'
  constructor(private http: HttpClient) { }

  saveCalificacion (calificacion: Calificacion) {
    return this.http.post(`${this.API_URI}/calificacion`,calificacion);
  }

  getCalificacion(){
    return this.http.get(`${this.API_URI}/calificacion`);
  }
}

