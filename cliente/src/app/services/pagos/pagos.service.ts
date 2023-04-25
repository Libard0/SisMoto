import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago } from 'src/app/models/facturas';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getPagos(){
    return this.http.get(`${this.API_URI}/pagos`);
  }

  getPago(id_pago: string){
    return this.http.get(`${this.API_URI}/pagos/${id_pago}`);
  }

  deletePago(id_pago: string){
    return this.http.delete(`${this.API_URI}/pagos/${id_pago}`);
  }

  savePago (pago: Pago) {
    return this.http.post(`${this.API_URI}/pagos`,pago);
  }

  updatedPago ({ id_pago, updatedPago }: { id_pago: number | undefined; updatedPago: Pago; }): Observable<Pago>{
    return this.http.put(`${this.API_URI}/pagos/${id_pago}`,updatedPago);
  }

}
