import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = environment.apiUrl+'/api/cliente';

  constructor(private http: HttpClient) { }
  // Obtener una lista
  getClientes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Crear un nuevo cliente
  createCliente(cliente: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cliente);
  }

  // Obtener un cliente por ID
  getCliente(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Actualizar cliente completo
  updateCliente(id: number, cliente: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cliente);
  }

  // Eliminar un cliente
  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
