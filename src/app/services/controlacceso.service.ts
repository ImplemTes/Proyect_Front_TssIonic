import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ControlaccesoService {
  private apiUrl = environment.apiUrl + '/api/controlaccesos';

  constructor(private http: HttpClient) { }

  // Listar todos los detalles
  list(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }
  listPersonas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/personas/`);
  }
  
  // Crear un nuevo controlaccesos
  create(acceso: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, acceso);
  }
  // Obtener  por ID
  getProgra(idprogra: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idprogra}`);
  }

  // Actualizar
  updateProgra(idprogra: number, progra: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${idprogra}`, progra);
  }

  // Eliminar
  deleteProgra(idprogra: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idprogra}`);
  }
}

