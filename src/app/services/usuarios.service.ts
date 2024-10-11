import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioAcceso } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = environment.apiUrl + "/api/usuario";
  constructor(private http: HttpClient) { }

  // Obtener una lista
  list(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Crear un nuevo usuario
  create(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, user);
  }

  // Obtener un usuario por su ID
  getById(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  // Listar usuarios por rol
  getByRole(roleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/role/${roleId}`);
  }

  // Actualizar un usuario
  edit(userId: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, user);
  }

  // Actualizar solo la contraseña de un usuario
  updatePassword(userId: number, passwordData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Password/${userId}`, passwordData);
  }

  // Eliminar un usuario
  delete(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }

  // Actualizar solo la contraseña de un usuario
  actualizar_acceso(userId: number, useracc: UsuarioAcceso): Observable<any> {
    return this.http.put(`${this.apiUrl}/acceso/${userId}`, useracc);
  }

}
