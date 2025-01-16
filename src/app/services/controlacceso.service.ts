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
    return this.http.get(`${this.apiUrl}/lista/`);
  }
  listPersonas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/personas/`);
  }
  
  // Crear un nuevo controlaccesos
  create(acceso: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, acceso);
  }

  retornadata(acceso: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/retorna/`, acceso);
  }


  // Obtener  por ID
  getProgra(idprogra: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idprogra}`);
  }

  // Actualizar
  updateAcceso(idacceso: number, form: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${idacceso}`, form);
  }

  // Eliminar
  deletAcces(idprogra: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idprogra}`);
  }
  ObtenerDatos(filtro: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cargardata/`, filtro);

  }
}

