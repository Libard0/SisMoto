import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Mantenimiento } from '../../models/mantenimiento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MantenimientosService {

  API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }
  getMantenimientos(){
    return this.http.get(`${this.API_URI}/Mantenimientos`);
  }

  getMantenimiento(id_mantenimiento: string){
    return this.http.get(`${this.API_URI}/Mantenimientos/${id_mantenimiento}`);
  }

  deleteMantenimiento(id_mantenimiento: string){
    return this.http.delete(`${this.API_URI}/Mantenimientos/${id_mantenimiento}`);
  }

  saveMantenimiento (mantenimiento: Mantenimiento) {
    return this.http.post(`${this.API_URI}/Mantenimientos`,mantenimiento);
  }

  updatedMantenimiento ({ id, updatedMantenimiento }: { id: number | undefined; updatedMantenimiento: Mantenimiento; }): Observable<Mantenimiento>{
    return this.http.put(`${this.API_URI}/Mantenimientos/${id}`,updatedMantenimiento);
  }
}