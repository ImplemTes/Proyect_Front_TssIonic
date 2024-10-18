import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiUrl = environment.apiUrl + '/api/rol';
  constructor(private http: HttpClient) { }

  // Listar todos los roles
  listarR(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  // Crear un nuevo rol
  create(rol: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, rol);
  }

  // Obtener un rol por su ID
  getById(rolId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${rolId}`);
  }


  // Actualizar un rol
  edit(rolId: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${rolId}`, user);
  }

  // Eliminar un rol
  delete(rolId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${rolId}`);
  }


}
