import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from '../../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getUsuarios(){
    return this.http.get(`${this.API_URI}/usuarios`);
  }

  getUsuario(id: string){
    return this.http.get(`${this.API_URI}/usuarios/${id}`);
  }

  deleteUsuario(id: string){
    return this.http.delete(`${this.API_URI}/usuarios/${id}`);
  }

  saveUsuario (usuario: Usuario) {
    return this.http.post(`${this.API_URI}/usuarios`, usuario);
  }

  updatedUsuario ({ id, updatedUsuario }: { id: number | undefined; updatedUsuario: Usuario; }): Observable<Usuario>{
    return this.http.put(`${this.API_URI}/usuarios/${id}`,updatedUsuario);
  }

}
