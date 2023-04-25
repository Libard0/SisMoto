import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from 'src/app/models/facturas';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }
  getFacturas(){
    return this.http.get(`${this.API_URI}/facturas`);
  }

  getFactura(id: string){
    return this.http.get(`${this.API_URI}/facturas/${id}`);
  }

  deleteFactura(id: string){
    return this.http.delete(`${this.API_URI}/facturas/${id}`);
  }

  saveFactura (factura: Factura) {
    return this.http.post(`${this.API_URI}/facturas`, factura);
  }

  updatedFactura ({ id, updatedFactura }: { id: number | undefined; updatedFactura: Factura; }): Observable<Factura>{
    return this.http.put(`${this.API_URI}/facturas/${id}`,updatedFactura);
  }

}
