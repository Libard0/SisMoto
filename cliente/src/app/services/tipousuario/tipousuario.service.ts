import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { tipousuario } from 'src/app/models/usuarios';
@Injectable({
  providedIn: 'root'
})
export class TipousuarioService {

  API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getTipousuarios() {
    return this.http.get(`${this.API_URI}/tipousuario`);
  }

  getTipousuario(id: string) {
    return this.http.get(`${this.API_URI}/tipousuario/${id}`);
  }

  deleteTipousuario(id: string) {
    return this.http.delete(`${this.API_URI}/tipousuario/${id}`);
  }

  saveTipousuario(tipousuario: tipousuario) {
    return this.http.post(`${this.API_URI}/tipousuario`, tipousuario);
  }

  updatedTipousuario({ id, updatedTipousuario }: { id: number | undefined; updatedTipousuario: tipousuario; }): Observable<tipousuario> {
    return this.http.put(`${this.API_URI}/tipousuario/${id}`, updatedTipousuario);
  }

}
