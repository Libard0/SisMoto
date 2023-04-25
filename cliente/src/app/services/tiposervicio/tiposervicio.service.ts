import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Tipo_servicio } from '../../models/mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class TiposervicioService {

  API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getTiposervicios(){
    return this.http.get(`${this.API_URI}/tiposervicio`);
  }

  getTiposervicio(id_tiposervicio: string){
    return this.http.get(`${this.API_URI}/tiposervicio/${id_tiposervicio}`);
  }

  deleteTiposervicio(id_tiposervicio: string){
    return this.http.delete(`${this.API_URI}/tiposervicio/${id_tiposervicio}`);
  }

  saveTiposervicio (tipo_servicio: Tipo_servicio) {
    return this.http.post(`${this.API_URI}/tiposervicio`, tipo_servicio);
  }

  updatedTiposervicio ({ id_tiposervicio, updatedTiposervicio }: { id_tiposervicio: number | undefined; updatedTiposervicio: Tipo_servicio; }): Observable<Tipo_servicio>{
    return this.http.put(`${this.API_URI}/tiposervicio/${id_tiposervicio}`,updatedTiposervicio);
  }

}
