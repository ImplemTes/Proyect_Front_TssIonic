import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AlmacenService {
  private apiUrl = environment.apiUrl + '/api/almacen';

  constructor(private http: HttpClient) { }

  // Listar todos los
  list(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  // Crear un nuevo
  create(almacen: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, almacen);
  }

  // Obtener  por ID
  getAlmacen(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Actualizar
  updateAlmacen(id: number, almacen: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, almacen);
  }

  // Eliminar
  deleteAlmacen(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
