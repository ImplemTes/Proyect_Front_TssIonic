import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private apiUrl = environment.apiUrl+'/api/proveedor';

  constructor(private http: HttpClient) { }

  // Listar todos los proveedores
  list(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }
     // Crear un nuevo proveedor

  create(proveedor: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, proveedor);
  }

}
