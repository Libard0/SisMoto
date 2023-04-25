import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Empleado } from 'src/app/models/empleados';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  API_URI = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }
  getEmpleados(){
    return this.http.get(`${this.API_URI}/empleados`);
  }

  getEmpleado(id: string){
    return this.http.get(`${this.API_URI}/empleados/${id}`);
  }

  deleteEmpleado(id: string){
    return this.http.delete(`${this.API_URI}/empleados/${id}`);
  }

  saveEmpleado (empleado: Empleado) {
    return this.http.post(`${this.API_URI}/empleados`, empleado);
  }

  updatedEmpleado ({ id, updatedEmpleado }: { id: number | undefined; updatedEmpleado: Empleado; }): Observable<Empleado>{
    return this.http.put(`${this.API_URI}/empleados/${id}`,updatedEmpleado);
  }

}
