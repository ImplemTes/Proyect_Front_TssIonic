import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AbastecimientoService {
  private apiUrl = environment.apiUrl + '/api/abastecimiento';

  constructor(private http: HttpClient) { }

  // Listar todos 
  list(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  // Crear un nuevo
  create(detalle: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, detalle);
  }

  // Obtener  por ID
  getDetalle(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Actualizar
  update(id: number, detalle: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, detalle);
  }

  // Eliminar
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
