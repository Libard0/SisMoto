import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DetalleRepuesto } from '../../models/productos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetallerepuestoService {

  API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }
  getDetallerepuestos() {
    return this.http.get(`${this.API_URI}/detallerepuesto`);
  }

  getDetallerepuesto(id: string) {
    return this.http.get(`${this.API_URI}/detallerepuesto/${id}`);
  }

  deleteDetallerepuesto(id: string) {
    return this.http.delete(`${this.API_URI}/detallerepuesto/${id}`);
  }

  saveDetallerepuesto(detallerepuesto: DetalleRepuesto) {
    return this.http.post(`${this.API_URI}/detallerepuesto`, detallerepuesto);
  }

  updatedDetallerepuesto({ id, updateddetallerepuesto }: {
    id: number | undefined;
    updateddetallerepuesto: DetalleRepuesto;
  }): Observable<DetalleRepuesto> {
    return this.http.put(`${this.API_URI}/detallerepuesto/${id}`, updateddetallerepuesto);
  }
}