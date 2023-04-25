import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DetalleFactura } from '../../models/facturas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleFacturaService {

  API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }
  getDetalleFacturas() {
    return this.http.get(`${this.API_URI}/detallefactura`);
  }

  getDetalleFactura(id: string) {
    return this.http.get(`${this.API_URI}/detallefactura/${id}`);
  }

  deleteDetalleFactura(id: string) {
    return this.http.delete(`${this.API_URI}/detallefactura/${id}`);
  }

  saveDetalleFactura(detallefactura: DetalleFactura) {
    return this.http.post(`${this.API_URI}/detallefactura`, detallefactura);
  }

  updatedDetalleFactura({ id, updateddetallefactura }: { id: number | undefined; 
    updateddetallefactura: DetalleFactura; }): Observable<DetalleFactura> {
    return this.http.put(`${this.API_URI}/detallefactura/${id}`, updateddetallefactura);
  }
}
