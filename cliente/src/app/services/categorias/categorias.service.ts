import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Categoria } from '../../models/productos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }
  getCategorias(){
    return this.http.get(`${this.API_URI}/Categorias`);
  }

  getCategoria(id: string){
    return this.http.get(`${this.API_URI}/Categorias/${id}`);
  }

  deleteCategoria(id: string){
    return this.http.delete(`${this.API_URI}/Categorias/${id}`);
  }

  saveCategoria (categoria: Categoria) {
    return this.http.post(`${this.API_URI}/Categorias`,categoria);
  }

  updatedCategoria ({ id, updatedCategoria }: { id: number | undefined; updatedCategoria: Categoria; }): Observable<Categoria>{
    return this.http.put(`${this.API_URI}/Categorias/${id}`,updatedCategoria);
  }
}
