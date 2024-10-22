import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = environment.apiUrl + '/api/producto';
  constructor(private http: HttpClient) { }

  // Listar todos los productos
  list(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  // Listar todos los productos
  listipos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tipo/`);
  }

  // Crear un nuevo producto
  create(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, formData);
  }

  // Obtener un producto por su ID
  getById(productoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${productoId}`);
  }


  // Actualizar un producto
  edit(productoId: number, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productoId}`,producto);
  }

  // Eliminar un producto
  delete(productoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productoId}`);
  }

}
