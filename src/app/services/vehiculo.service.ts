import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private apiUrl = environment.apiUrl + '/api/vehiculo';

  constructor(private http: HttpClient) { }

  // Listar todos los
  list(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  // Crear un nuevo
  create(vehiculo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, vehiculo);
  }

  // Obtener  por ID
  getVehiculo(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Actualizar
  update(id: number, vehiculo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, vehiculo);
  }

  // Eliminar
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  ObtenerObjeto(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/objeto`, formData);
  }
}
